import {ProductType} from '../../types/product.types';
import React, {useState} from 'react';
import './product.scss';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDeleteProduct, usePutProduct} from '../../hooks/rest';

type ProductProps =  {
  product: ProductType | undefined;
  setIdForChange: React.Dispatch<React.SetStateAction<string>>;
}

function Product({product, setIdForChange}: ProductProps) {
  const [changeStatus, setChangeStatus] = useState(false);

  const {
    register,
    handleSubmit,
    setValue
  } = useForm<ProductType>();

  const {mutate: update} = usePutProduct();
  const {mutate: deleteProduct} = useDeleteProduct();

  const onCloseButtonClickHandler = () => {
    setIdForChange('');
  }

  const onChangeButtonClickHandler = () => {
    if (product) {
      setValue('title', product?.title);
      setValue('category', product?.category);
      setValue('description', product?.description);
      setValue('price', product?.price);
    }
    setChangeStatus(true);
  }

  const onSaveButtonClickHandler: SubmitHandler<ProductType> = (data) => {
    const updatedProduct: ProductType = {...product, ...data};
    setChangeStatus(false);
    update(updatedProduct);
    setIdForChange('');
  }

  const onDeleteButtonClickHandler = () => {
    if (product?.id) {
      deleteProduct(product.id);
    }
  }

  if (product && !changeStatus) {
    return (
      <div className="product">
        <article className="product__box">
          <h2 className="product__title">{product.title}</h2>
          <img src={product.image} alt="" className="product__image"/>
          <div className="product__category">{product.category}</div>
          <div className="product__description">{product.description}</div>
          <div className="product__price">{product.price}</div>
          <div className="product__rating">{product.rating.rate}</div>
          <button onClick={onChangeButtonClickHandler} className="product__change">Изменить</button>
          <button onClick={onDeleteButtonClickHandler} className="product__close">Удалить</button>
          <button onClick={onCloseButtonClickHandler} className="product__close">Закрыть</button>
        </article>
      </div>
    );
  }

  if (product && changeStatus) {
    return (
      <div className="product">
        <form onSubmit={handleSubmit(onSaveButtonClickHandler)} className="product__box">
          <input className="product__title-input" {...register('title')} type="text"/>
          <img src={product.image} alt="" className="product__image-input"/>
          <input className="product__category-input" {...register('category')} type="text"/>
          <textarea className="product__description-input" {...register('description')} />
          <input className="product__price-input" {...register('price')} type="text" />
          <button type="submit" className="product__change-input">Сохранить</button>
          <button onClick={onCloseButtonClickHandler} className="product__close">Закрыть</button>
        </form>
      </div>
    );
  }

  return <></>
}

export default Product;