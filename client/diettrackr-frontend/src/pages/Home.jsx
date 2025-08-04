// 7. Dummy Login Simulation (src/pages/Home.jsx)
import { useState } from 'react';
import MealLog from './MealLog';

const Home = () => {
  const [userId, setUserId] = useState(null);

  const handleLogin = () => {
    // Simulate setting a logged-in user
    setUserId("7fa889fb-ca39-401f-b9e0-41cc0ab9a61b");
  };
  console.log(userId)

  return (
    <div className="p-4">
      {!userId ? (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      ) : (
        <MealLog userId={userId} />
      )}
    </div>
  );
};

export default Home;
