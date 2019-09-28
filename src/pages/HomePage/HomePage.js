import React from 'react';
import { useUserContext } from '../../components/utils/UserContext';

const HomePage = () => {
  const { user } = useUserContext();
  return (
    <div>
      Home Page
    <h2>{user}</h2>
    </div>
  );
}

export default HomePage;