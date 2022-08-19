import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { getExchange } from '../../store/selectors';
import './Exchange.scss';

export const Exchange: React.FC = () => {
  const exchange = useSelector(getExchange);
  const [inputValue, setInputValue] = useState<string>('');
  const [rezult, setRezult] = useState<number>();
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);

  const value = (inputVal:string) => {
    const regExp = /^"{1}[0-9]+\s+(usd|eur|uah)+"{1}\s(in)\s"{1}(usd|eur|uah)"{1}$/;
    let rezultArray:string[] = [];

    if (!regExp.test(inputVal)) {
      setActive(false);
    } else if (regExp.test(inputVal)) {
      setActive(true);
      setError('');

      rezultArray = inputVal.split('"').join('').split(' ');
    }

    return rezultArray;
  };

  const exportMoney = () => {
    const myArr = value(inputValue);

    if (myArr) {
      if (myArr[1] === 'uah' && myArr[3] === 'usd') {
        setRezult((Number(myArr[0]) / exchange.UAH) * exchange.USD);
      } else if (myArr[1] === 'uah' && myArr[3] === 'eur') {
        setRezult((Number(myArr[0]) / exchange.UAH) * exchange.EUR);
      } else if (myArr[1] === 'eur' && myArr[3] === 'usd') {
        setRezult(Number(myArr[0]) * exchange.USD);
      } else if (myArr[1] === 'eur' && myArr[3] === 'uah') {
        setRezult(Number(myArr[0]) * exchange.UAH);
      } else if (myArr[1] === 'usd' && myArr[3] === 'uah') {
        setRezult((Number(myArr[0]) / exchange.USD) * exchange.UAH);
      } else if (myArr[1] === 'usd' && myArr[3] === 'eur') {
        setRezult(Number(myArr[0]) / exchange.USD);
      } else {
        setError('Write correct rate!!!!');
      }
    } else {
      setError('Write correct value!!!!');
    }
  };

  return (
    <div className="exchanges">
      <p className="exchanges__title">Enter a value in the format &quot;100 usd&quot; in &quot;uah&quot;</p>
      <input
        className="exchanges__input input is-primary"
        type="text"
        value={inputValue}
        onKeyDown={e => e.key === 'Enter' && (exportMoney())}
        onChange={(event) => {
          setInputValue(event.target.value);
          value(event.target.value);
        }}
      />
      {
        error !== '' && (
          <p>{error}</p>
        )
      }
      <button
        className={classnames('exchanges__button button is-primary', { 'is-danger': !active })}
        type="button"
        onClick={() => {
          exportMoney();
        }}
      >
        {active ? 'Exchange' : 'Write value in input'}
      </button>
      <p className="exchanges__total">{rezult?.toFixed(2)}</p>
    </div>
  );
};
