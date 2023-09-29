import {useAxios} from './axios';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  productController, productDeleteController,
  productPostController,
  productPutController,
  productsController,
} from '../services/controlles';
import {ProductsType, ProductType} from '../types/product.types';

export function useProducts() {
  const axios = useAxios();

  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsController(axios)
  });
}

export function useProduct(productId: string) {
  const axios = useAxios();

  return useQuery({
    queryKey: ['product'],
    queryFn: () => productController(axios, productId)
  });
}

export function usePostProduct() {
  const axios = useAxios();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductType) => productPostController(axios, data),
    onSuccess: (data) => {
        client.setQueriesData<ProductsType>(['products'], (oldProducts) => {
          return [...(oldProducts || []), data]
        });
        client.invalidateQueries({
          queryKey: ['products'],
          refetchType: 'none',
        })
      }
  });
}

export function usePutProduct() {
  const axios = useAxios();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: ProductType) => productPutController(axios, newProduct),
    onSuccess: (data) => {
      client.setQueriesData<ProductsType>(['products'], (oldProducts) => {
        const newProductId = oldProducts?.findIndex(prod => prod.id === data.id );
        if (oldProducts && newProductId) {
          oldProducts[newProductId] = data;
        }
        return oldProducts;
      });
    }
  });
}

export function useDeleteProduct () {
  const axios = useAxios();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (dataId: string) => productDeleteController(axios, dataId),
    onSuccess: (data) => {
      client.setQueriesData<ProductsType>(['products'], (oldProducts) => {
        const filteredProd = oldProducts?.filter((product) => {
          return product.id !== data.id
        })
        return filteredProd;
      });
    }
  });
}