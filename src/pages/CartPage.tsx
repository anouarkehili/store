import React from 'react';
import { Cart as CartComponent } from '../components/Cart';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  return <CartComponent onClose={() => navigate(-1)} />;
};