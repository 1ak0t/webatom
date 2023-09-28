import {ContextValue} from '../hooks/axios';
import {ProductType} from '../types/product.types';

export const productsController = async (axios: ContextValue) => {
  const response = await axios?.get(
    "https://fakestoreapi.com/products"
  );

  return response?.data;
}

export const productController = async (axios: ContextValue, productID: string) => {
  const response = await axios?.get(
    `https://fakestoreapi.com/products/${productID}`
  );

  return response?.data;
}

export const productPostController = async (axios: ContextValue, product: ProductType) => {
  const response = await axios?.post(
    `https://fakestoreapi.com/products/`
  );
  console.log(response);
  return product;
}

export const productPutController = async (axios: ContextValue, product: ProductType) => {
  const response = await axios?.put(
    `https://fakestoreapi.com/products/${product.id}`
  );
  console.log(response);
  return product;
}

export const productDeleteController = async (axios: ContextValue, productId: string) => {
  const response = await axios?.delete(
    `https://fakestoreapi.com/products/${productId}`
  );

  return response?.data;
}