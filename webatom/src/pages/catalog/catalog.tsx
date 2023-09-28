import {Helmet} from 'react-helmet-async';
import {usePostProduct, useProducts} from '../../hooks/rest';
import {ProductsType, ProductType} from '../../types/product.types';
import ProductCard from '../../components/product-card/product-card';
import './catalog.scss'
import AddProductForm from '../../components/add-product-form/add-product-form';
import Product from '../../components/product/product';
import {useState} from 'react';

function Catalog() {
  const {data: products, isLoading} = useProducts();
  const [idForChange, setIdForChange] = useState('');

  const addProductButtonHandler = () => {
    const addProdForm = document.querySelector('.add-product');
    if (addProdForm) {
      addProdForm.classList.remove('add-product--inactive');
    }
  }

  const findProductById = (data:ProductsType, id: string) => {
    return data.find((prod) => prod.id === id);
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <div>
        <Helmet>
          <title>Каталог</title>
        </Helmet>
        <h1 className="catalog__title">Каталог</h1>
        <div className="catalog">
          {products.map((product: ProductType) => <ProductCard product={product} setIdForChange={setIdForChange} key={product.id} />)}
        </div>
        <button className="catalog__add-product" onClick={addProductButtonHandler}>Добавить продукт</button>
      </div>
      <AddProductForm />
      {idForChange !== '' ? <Product product={findProductById(products, idForChange)} setIdForChange={setIdForChange}/> : ''}
    </>
  );
}

export default Catalog;