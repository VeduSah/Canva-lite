import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateId } from '../utils/generateId';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const newId = generateId();
    navigate(`/canvas/${newId}`);
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default Home;