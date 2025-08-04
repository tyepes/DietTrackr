import { useQuery } from '@apollo/client';
import { GET_MEAL_ENTRIES } from '../graphql/queries';

const MealLog = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_MEAL_ENTRIES, {
    variables: { userId },
  });
  console.log(GET_MEAL_ENTRIES)
  console.log({ loading, error, data });
  console.log('GraphQL URL:', import.meta.env.VITE_GRAPHQL_API_URL);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data && data.mealsForUser.length === 0) {
    return <p>No meals logged yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Meal Log</h2>
      {data.mealsForUser.map(meal => (
        <div key={meal.id} className="border p-4 mb-2">
          <p>Date: {new Date(meal.dateTime).toLocaleString()}</p>
          <p>Calories: {meal.totalCalories}</p>
          <p>Type: {meal.mealType}</p>
          <p>Notes: {meal.notes}</p>
          <ul>
            {meal.foodItems.map((food, index) => (
              <li key={index}>{food.name} - {food.calories} cal</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MealLog;