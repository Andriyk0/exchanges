/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getData } from './api/api';
import './App.scss';
import { Header } from './components/Header';
import { Exchange } from './components/Exchange';
import { ExchangeRate } from './components/ExchangeRate';
import { Home } from './components/Home';
import { setExchange } from './store';
import { getExchange } from './store/selectors';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const exchange = useSelector(getExchange);

  useEffect(() => {
    const loadDataFromServer = async () => {
      try {
        const response = await getData();

        dispatch(setExchange(response.rates));
      } catch (error) {
        alert('Error try again');
      }
    };

    loadDataFromServer();
  }, []);

  return (
    <>
      <Header />
      { !exchange && (
        <p>Loading...</p>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="exchange_rate" element={<ExchangeRate />} />
      </Routes>
    </>
  );
};
