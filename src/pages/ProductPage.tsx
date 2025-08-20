import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetail as ProductDetailComponent } from '../components/ProductDetail';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <div>Product not found</div>;
  }

  return (
    <ProductDetailComponent
      productId={id}
      onBack={() => navigate('/')}
    />
  );
};