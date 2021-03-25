const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', (req, res, next) => {
    OrderService.create(req.body)
      .then((order) => res.send(order))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Order.selectAll()
      .then((orders) => res.json(orders))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Order.selectById(req.params.id)
      .then((order) => res.json(order))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    OrderService.updateEdited(req.params.id, req.body)
      .then((order) => res.json(order))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    OrderService.deletedOrder(req.params.id, req.body)
      .then((order) => res.json(order))
      .catch(next);
  });
