import {SubmitHandler, useForm} from 'react-hook-form';
import {ProductType} from '../../types/product.types';
import {usePostProduct} from '../../hooks/rest';
import {useRef} from 'react';
import {nanoid} from 'nanoid';
import {useAxios} from '../../hooks/axios';
import './add-product-form.scss';

function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<ProductType>();

  const addProductBox = useRef<HTMLDivElement | null>(null);
  const {mutate: send} = usePostProduct();

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    const newProduct = {...data, id: nanoid(), rating: {rate: '4', count: '200'}};
    send(newProduct);
    reset();
    addProductBox.current?.classList.add('add-product--inactive');
  }

  const onCloseButtonHandler = () => {
    addProductBox.current?.classList.add('add-product--inactive');
    reset();
  }

  return (
    <div ref={addProductBox} className="add-product add-product--inactive">
      <form onSubmit={handleSubmit(onSubmit)} className="add-product__form">
        <h2>Добавить продукт</h2>
        <input {...register('title',
          {
            required: 'Необходимо ввести название',
          }
        )} placeholder='Название' type="text"/>
        {errors.title && <div className="add-product__error">{errors.title.message}</div>}
        <input {...register('price',
          {
            required: 'Необходимо ввести цену',
          }
        )} placeholder='Название' type="text"/>
        {errors.price && <div className="add-product__error">{errors.price.message}</div>}
        <input {...register('category',
          {
            required: 'Необходимо ввести категорию',
          }
        )} placeholder='Название' type="text"/>
        {errors.category && <div className="add-product__error">{errors.category.message}</div>}
        <input {...register('description',
          {
            required: 'Необходимо ввести описание',
          }
        )} placeholder='Название' type="text"/>
        {errors.description && <div className="add-product__error">{errors.description.message}</div>}
        <input {...register('image',
          {
            required: 'Необходимо добавить изображение',
          }
        )} placeholder='Название' type="file"/>
        {errors.image && <div className="add-product__error">{errors.image.message}</div>}
        <button className="add-product__send" type="submit">Отправить</button>
        <button onClick={onCloseButtonHandler}>Закрыть</button>
      </form>
    </div>
  );
}

export default AddProductForm;