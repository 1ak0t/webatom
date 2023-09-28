export type ProductType = {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: string;
    count: string;
  }
}

export type ProductUpdateType = {
  id: string;
  title?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
}

export type ProductsType = ProductType[];