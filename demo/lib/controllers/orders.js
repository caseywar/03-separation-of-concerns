const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    Order.selectAll()
      .then((orders) => res.json(orders))
      .catch(next);

    // try {
    //   const orders = await OrderService.getAll();
    //   res.send(orders);
    // } catch (err) {
    //   next(err);
    // }
  })

  .get('/:id', async (req, res, next) => {
    Order.selectById(req.params.id)
      .then((order) => res.json(order))
      .catch(next);

    // try {
    //   const order = await Order.selectById(req.params.id);
    //   res.send(order);
    // } catch (err) {
    //   next(err);
    // }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.updateEdited(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {});
