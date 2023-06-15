import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from '../src/context/auth';
import { CartProvider } from './context/cart';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AuthProvider>
    <SearchProvider>
   <CartProvider>
   <App />
   </CartProvider>
   </SearchProvider>
</AuthProvider>

);

