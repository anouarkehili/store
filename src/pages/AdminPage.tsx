import React from 'react';
import { AdminPanel as AdminPanelComponent } from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  return <AdminPanelComponent onBack={() => navigate('/')} />;
};