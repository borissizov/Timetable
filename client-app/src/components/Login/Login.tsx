import React, { useState } from 'react';
import Slider from '../../features/Slider/Slider';
import vk from '../../assets/socials/vk.svg';
import insta from '../../assets/socials/instagram.svg';
import { Link } from 'react-router-dom';
import Pages from '../../features/Pages/Pages';
import { IUserForm } from '../../app/api/models/user';
import { useStore } from '../../app/stores/store';
import Loading from '../../features/Loading/Loading';
import { observer } from 'mobx-react-lite';

const Login: React.FC = () => {
  const initialState: IUserForm = {
    login: "",
    password: ""
  };
  const [creds, setCreds] = useState<IUserForm>(initialState);
  const { userStore: { loading, login } } = useStore();
  
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({...creds, [e.target.name]: e.target.value});
  }

  return (
    <Pages>
      <section className="login">
        <h2 className="login__title">Авторизация</h2>
        <ul className="login__socials">
          <li className="login__social">
            <a href="https://vk.com/kaiknitu"><img src={vk} alt="vk"/></a>
          </li>
          <li className="login__social">
            <a href="https://vk.com/kaiknitu"><img src={insta} alt="insta"/></a>
          </li>
        </ul>
        <div className="login__content">
          <form className="form">
            <input
              type="text"
              placeholder="Введите ваш логин"
              name="login"
              value={creds.login}
              onChange={changeValueHandler}
              onFocus={(e) => e.target.select()}
              className="input login__input"></input>
            <input
              type="password"
              placeholder="Введите ваш пароль"
              name="password"
              value={creds.password}
              onChange={changeValueHandler}
              onFocus={(e) => e.target.select()}
              className="input login__input"></input>
              <div className="login__btns">
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    login(creds);
                  }}
                  className="btn btn--success login__btn">
                  {loading ? <Loading
                    width={15}
                    height={15}
                    spanWidth={3}
                    spanHeight={3}
                    backgroundColor="#fff" /> : 'Войти'}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setCreds(initialState);
                  }}
                  className="btn btn--error login__btn">Стереть</button>
              </div>
            <Link to="/apply" className="btn login__apply">Подать заявку на регистрацию</Link>
            <Link to="/forget-paswword" className="link login__link">Забыли пароль?</Link>
          </form>
          <Slider className="login__slider" elemets={
            [
              <img src="/assets/buildings/first.jpg" alt="fstBuilding" />,
              <img src="/assets/buildings/second.jpg" alt="secBuilding" />,
              <img src="/assets/buildings/third.jpg" alt="thiBuilding" />,
              <img src="/assets/buildings/fourth.jpg" alt="fourBuilding" />,
              <img src="/assets/buildings/fiveth.jpg" alt="fiveBuilding" />,
              <img src="/assets/buildings/sixth.jpg" alt="sixBuilding" />,
              <img src="/assets/buildings/seventh.jpg" alt="sevBuilding" />,
              <img src="/assets/buildings/eightth.jpg" alt="eightBuilding" />
            ]
          } />
        </div>
      </section>
    </Pages>
  );
};

export default  observer(Login);