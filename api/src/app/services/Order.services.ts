import { Request, Response } from 'express';
import { Order } from '../models/Order.model';

export async function listOrders(_req: Request, res: Response) {
  const result = await Order
    .find()
    .sort({ createdAt: -1 })
    .populate('products.product');

  res.status(200).json(result);
}

export async function createOrder(req: Request, res: Response) {
  try {
    const {table, products} = req.body;

    const result = await Order.create({table, products});

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function updateOrder(req: Request, res: Response) {
  const { orderId } = req.params;
  const { status } = req.body;
  const invalidStatus = !['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status);

  if (invalidStatus) {
    return res.status(400).send({
      error: 'Status deveria ser uma das seguintes opções: WAITING, IN_PRODUCTION, DONE'
    });
  }

  await Order.findByIdAndUpdate(orderId, { status });

  res.status(204).end();
}

export async function deleteOrder(req: Request, res: Response) {
  const { orderId } = req.params;

  await Order.findByIdAndDelete(orderId);

  res.status(204).end();
}