// src/components/MealEntryForm.jsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_MEAL_ENTRY, GET_MEAL_ENTRIES } from '../graphql/queries';

const MealEntryForm = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().slice(0, 16), // Format for datetime-local input
    mealType: 'BREAKFAST',
    notes: ''
  });

  const [foodItems, setFoodItems] = useState([
    {
      name: '',
      description: '',
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      type: 'OTHER'
    }
  ]);

  const [createMealEntry, { loading, error }] = useMutation(CREATE_MEAL_ENTRY, {
    refetchQueries: [{ query: GET_MEAL_ENTRIES, variables: { userId } }],
    onCompleted: () => {
      if (onSuccess) onSuccess();
      // Reset form
      setFormData({
        dateTime: new Date().toISOString().slice(0, 16),
        mealType: 'BREAKFAST',
        notes: ''
      });
      setFoodItems([{
        name: '',
        description: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fats: 0,
        type: 'OTHER'
      }]);
    }
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFoodItemChange = (index, field, value) => {
    setFoodItems(prev => 
      prev.map((item, i) => 
        i === index 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addFoodItem = () => {
    setFoodItems(prev => [...prev, {
      name: '',
      description: '',
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      type: 'OTHER'
    }]);
  };

  const removeFoodItem = (index) => {
    if (foodItems.length > 1) {
      setFoodItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const calculateTotalCalories = () => {
    return foodItems.reduce((total, item) => total + (parseFloat(item.calories) || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const totalCalories = calculateTotalCalories();
    
    // Prepare the variables for debugging
    const variables = {
      userId,
      dateTime: new Date(formData.dateTime).toISOString(), // Convert to proper ISO format
      foodItems: foodItems.map((item, index) => ({
        id: index + 1, // Provide a temporary ID for the input
        name: item.name || '',
        description: item.description || '',
        calories: parseFloat(item.calories) || 0,
        protein: parseFloat(item.protein) || 0,
        carbohydrates: parseFloat(item.carbohydrates) || 0,
        fats: parseFloat(item.fats) || 0,
        type: item.type
      })),
      totalCalories,
      notes: formData.notes || null,
      mealType: formData.mealType
    };

    console.log('Submitting meal entry with variables:', variables);
    
    try {
      const result = await createMealEntry({
        variables
      });
      console.log('Meal entry created successfully:', result);
    } catch (err) {
      console.error('Error creating meal entry:', err);
      console.error('GraphQL errors:', err.graphQLErrors);
      console.error('Network error:', err.networkError);
      if (err.networkError?.result) {
        console.error('Network error details:', err.networkError.result);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add Meal Entry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Meal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => handleFormChange('dateTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meal Type
            </label>
            <select
              value={formData.mealType}
              onChange={(e) => handleFormChange('mealType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
              <option value="SNACK">Snack</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        {/* Food Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Food Items</h3>
            <button
              type="button"
              onClick={addFoodItem}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Food Item
            </button>
          </div>

          {foodItems.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Food Item {index + 1}</h4>
                {foodItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFoodItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleFoodItemChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Food name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={item.calories}
                    onChange={(e) => handleFoodItemChange(index, 'calories', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Food Type
                  </label>
                  <select
                    value={item.type}
                    onChange={(e) => handleFoodItemChange(index, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="FRUIT">Fruit</option>
                    <option value="VEGETABLE">Vegetable</option>
                    <option value="PROTEIN">Protein</option>
                    <option value="GRAIN">Grain</option>
                    <option value="DAIRY">Dairy</option>
                    <option value="SNACK">Snack</option>
                    <option value="BEVERAGE">Beverage</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={item.protein}
                    onChange={(e) => handleFoodItemChange(index, 'protein', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={item.carbohydrates}
                    onChange={(e) => handleFoodItemChange(index, 'carbohydrates', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    value={item.fats}
                    onChange={(e) => handleFoodItemChange(index, 'fats', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleFoodItemChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Optional description"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total Calories Display */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Total Calories: {calculateTotalCalories().toFixed(1)}
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleFormChange('notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="3"
            placeholder="Any additional notes about this meal..."
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p className="font-medium">Error creating meal entry:</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Meal...' : 'Add Meal Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealEntryForm;