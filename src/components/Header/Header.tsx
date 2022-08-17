/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './Header.scss';

export const Header: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState('');

  return (
    <div className="exchange">
      <Link
        className={classnames('exchange__link', { exchange__link_active: activeBtn === 'Exchange' })}
        to="exchange"
        onClick={() => setActiveBtn('Exchange')}
      >
        Exchange
      </Link>
      <Link
        className={classnames('exchange__link', { exchange__link_active: activeBtn === 'ExchangeRate' })}
        to="exchange_rate"
        onClick={() => setActiveBtn('ExchangeRate')}
      >
        Exchange rate
      </Link>
    </div>
  );
};
