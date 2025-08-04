// Add this to your existing queries.js file
import { gql } from '@apollo/client';

// Your existing query
export const GET_MEAL_ENTRIES = gql`
  query GetMealEntries($userId: UUID!) {
    mealsForUser(userId: $userId) {
      id
      dateTime
      totalCalories
      notes
      mealType
      foodItems {
        name
        calories
      }
    }
  }
`;

// New mutation for creating meal entries
export const CREATE_MEAL_ENTRY = gql`
  mutation CreateMealEntry(
    $userId: UUID!
    $dateTime: DateTime!
    $foodItems: [FoodItemInput!]!
    $totalCalories: Float!
    $notes: String
    $mealType: MealType!
  ) {
    createMealEntry(
      userId: $userId
      dateTime: $dateTime
      foodItems: $foodItems
      totalCalories: $totalCalories
      notes: $notes
      mealType: $mealType
    ) {
      id
      dateTime
      totalCalories
      notes
      mealType
      foodItems {
        name
        calories
        protein
        carbohydrates
        fats
        type
      }
    }
  }
`;