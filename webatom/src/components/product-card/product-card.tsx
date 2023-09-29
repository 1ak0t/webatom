import {ProductType} from '../../types/product.types';
import './product-card.scss';
import React, {useRef} from 'react';

type ProductCardProps = {
  product: ProductType
  setIdForChange: React.Dispatch<React.SetStateAction<string>>
}

function ProductCard({product, setIdForChange}: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);

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
    </article>
  );
}

export default ProductCard;