const express = require('express');
const restaurantRoutes = express.Router();

let Restaurant = require('../models/restaurant');

// POST /api/restaurants
restaurantRoutes.route('/').post(function(req, res) {
    Restaurant.addNewRestaurant(req.body)
        .then(restaurant => {
            res.status(201).json(restaurant);
        })
        .catch(err => {
            res.status(400).send('adding new restaurant failed');
        });
});

// GET /api/restaurants
restaurantRoutes.route('/').get(function(req, res) {
    let page = Number(req.query.page);
    let perPage = Number(req.query.perPage);
    let borough = req.query.borough;

    Restaurant.getAllRestaurants(page, perPage, borough)
        .then(restaurants => {
            res.render('restaurants', { restaurants: restaurants });
        })
        .catch(err => {
            res.status(500).send('error retrieving restaurants');
        });
});

// GET /api/restaurants/:id
restaurantRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;

    Restaurant.getRestaurantById(id)
        .then(restaurant => {
            res.render('restaurant', { restaurant: restaurant });
        })
        .catch(err => {
            res.status(500).send('error retrieving restaurant');
        });
});

// PUT /api/restaurants/:id
restaurantRoutes.route('/:id').put(function(req, res) {
    let id = req.params.id;
    let data = req.body;

    Restaurant.updateRestaurantById(data, id)
        .then(restaurant => {
            res.json(restaurant);
        })
        .catch(err => {
            res.status(500).send('error updating restaurant');
        });
});

// DELETE /api/restaurants/:id
restaurantRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;

    Restaurant.deleteRestaurantById(id)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send('error deleting restaurant');
        });
});

// GET /api/restaurants/top/:borough
restaurantRoutes.route('/top/:borough').get(function(req, res) {
    let borough = req.params.borough;

    Restaurant.getTopRestaurants(borough)
        .then(restaurants => {
            res.render('restaurants', { restaurants: restaurants });
        })
        .catch(err => {
            res.status(500).send('error retrieving top restaurants');
        });
});

// GET /api/restaurants/new
restaurantRoutes.route('/new').get(function(req, res) {
    res.render('form');
});

module.exports = restaurantRoutes;
