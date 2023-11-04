import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app';

const COUNT_RENT_OFFERS = 5 ;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App countRentOffers = {COUNT_RENT_OFFERS}/>
  </React.StrictMode>
);
