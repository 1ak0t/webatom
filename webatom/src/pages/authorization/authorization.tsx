import {SubmitHandler, useForm} from 'react-hook-form';
import {loginUserData} from '../../types/user.types';
import {Helmet} from 'react-helmet-async';
import './authorization.scss';
import {useAppDispatch} from '../../hooks/redux';
import {loginAction} from '../../store/api-actions';

function Authorization() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<loginUserData>({
    mode: 'onChange'
  });

  const dispatch = useAppDispatch();

  const handleSubmitButton: SubmitHandler<loginUserData> = (data) => {
    console.log(data);
    reset();
    dispatch(loginAction(data));
  }

  return (
    <div className="authorization">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <form onSubmit={handleSubmit(handleSubmitButton)} className="authorization__form">
        <input {...register('username',
               {
                 required: 'Необходимо ввести адрес электронной почты',
               }
        )} placeholder='Email' type="text"/>
        {errors.username && <div>{errors.username.message}</div>}
        <input {...register('password',
               {
                 required: 'Необходимо ввести пароль'
               }
        )} placeholder='Пароль' type="password"/>
        {errors.password && <div>{errors.password.message}</div>}
        <button className="authorization__send">Send</button>
      </form>
    </div>
  );
}

export default Authorization;