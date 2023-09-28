import {ProductType} from '../../types/product.types';
import './product-card.scss';
import React, {useRef} from 'react';
import {useDeleteProduct} from '../../hooks/rest';

type ProductCardProps = {
  product: ProductType
  setIdForChange: React.Dispatch<React.SetStateAction<string>>
}

function ProductCard({product, setIdForChange}: ProductCardProps) {
  const deleteButton = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLElement>(null)
  const {mutate: deleteProduct} = useDeleteProduct();

  const onDeleteButtonClickHandler = () => {
    if (deleteButton.current?.parentElement) {
      const productId = deleteButton.current?.parentElement.id;
      deleteProduct(productId);
    }
  }

  const onCardClickHandler = () => {
    if (cardRef.current) {
      const productId = cardRef.current.id;
      setIdForChange(productId);
    }
  }

  return (
    <article ref={cardRef} onClick={onCardClickHandler} className="product-card" id={product.id}>
      <img src={product.image} alt="" className="product-card__img"/>
      <h3 className="product-card__title">{product.title}</h3>
      <span className="product-card__category">{product.category}</span>
      <span className="product-card__price">{product.price} &#8381;</span>
      <span className="product-card__rate">{product.rating.rate}</span>
      <button ref={deleteButton} onClick={onDeleteButtonClickHandler} className="product-card__delete">X</button>
    </article>
  );
}

export default ProductCard;