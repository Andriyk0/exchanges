import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getExchange } from '../../../store/selectors';
import './ExchangeRate.scss';

export const ExchangeRate: React.FC = () => {
  const exchange = useSelector(getExchange);
  const arrOfRate = ['usd', 'eur', 'uah'];
  const [selectValue, setSelectValue] = useState('usd');

  return (
    <div className="rate">
      <div className="rate__left_side">
        <select
          className="rate__select"
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
        >
          {
            arrOfRate.map(item => <option key={item} value={item}>{item.toUpperCase()}</option>)
          }
        </select>
      </div>
      <div className="rate__right_side">
        {
          selectValue === 'usd' && (
            <div className="rate__exchange_box">
              <p>{`1 USD = ${(1 / exchange.USD).toFixed(2)} EUR`}</p>
              <p>{`1 USD = ${((1 / exchange.USD) * exchange.UAH).toFixed(2)} UAH`}</p>
            </div>
          )
        }

        {
          selectValue === 'uah' && (
            <div className="rate__exchange_box">
              <p>{`1 UAH = ${((1 / exchange.UAH) * exchange.EUR).toFixed(2)} EUR`}</p>
              <p>{`1 UAH = ${((1 / exchange.UAH) * exchange.USD).toFixed(2)} USD`}</p>
            </div>
          )
        }

        {
          selectValue === 'eur' && (
            <div className="rate__exchange_box">
              <p>{`1 EUR = ${(exchange.UAH).toFixed(2)} UAH`}</p>
              <p>{`1 EUR = ${(exchange.USD).toFixed(2)} USD`}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};
