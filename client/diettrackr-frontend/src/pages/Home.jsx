// src/pages/Home.jsx - Updated to include the meal entry form
import { useState } from 'react';
import MealLog from './MealLog';
import MealEntryForm from '../components/MealEntryForm';

const Home = () => {
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleLogin = () => {
    // Simulate setting a logged-in user
    setUserId("7fa889fb-ca39-401f-b9e0-41cc0ab9a61b");
  };

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  console.log(userId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!userId ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              DietTrackr
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Track your meals and nutrition easily
            </p>
            <button 
              onClick={handleLogin} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Login to Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              DietTrackr Dashboard
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                showForm 
                  ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {showForm ? 'Cancel' : 'Add New Meal'}
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {showForm && (
              <MealEntryForm 
                userId={userId} 
                onSuccess={handleFormSuccess}
              />
            )}
            
            <MealLog userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;