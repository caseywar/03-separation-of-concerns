const { Router } = require('express');
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
    OrderService.getAll()
      .then((orders) => res.json(orders))
      .catch(next);

    // try {
    //   const orders = await OrderService.getAll();
    //   res.send(orders);
    // } catch (err) {
    //   next(err);
    // }
  })

  .get('/:id', async (req, res, next) => {})
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
