import { Request, Response } from 'express';
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';

export async function listCategories(_req: Request, res: Response) {
  const result = await Category.find();

  res.status(200).json(result);
}

export async function createCategory(req: Request, res: Response) {
  try {
    const {name, icon} = req.body;

    if (!name || !icon) {
      return res.status(400).json({error: 'Missing name or icon'});
    }

    const result = await Category.create({name, icon});

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function listProductsByCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  const result = await Product
    .find()
    .where('category')
    .equals(categoryId);

  res.status(200).json(result);
}
