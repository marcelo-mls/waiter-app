import { Request, Response } from 'express';
import { Product } from '../models/Product.model';

export async function listProducts(_req: Request, res: Response) {
  const result = await Product.find();

  res.status(200).json(result);
}

export async function createProducts(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const {name, description, price, category, ingredients} = req.body;

    const result = await Product.create(
      {
        name,
        description,
        imagePath,
        price: Number(price),
        category,
        ingredients: ingredients ? JSON.parse(ingredients) : []
      }
    );

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  res.status(204).end();
}