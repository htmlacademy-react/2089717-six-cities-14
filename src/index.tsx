import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app';
import {generatedOffers} from '../src/components/mocks/offers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      mockData={generatedOffers}
    />
  </React.StrictMode>
);
