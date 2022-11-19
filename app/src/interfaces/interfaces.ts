export interface IProduct {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: {
      name: string;
      icon: string;
      _id: string;
  }[];
}

export interface CartItem {
  quantity: number;
  product: IProduct;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
}