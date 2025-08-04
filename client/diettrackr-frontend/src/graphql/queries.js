import { gql } from '@apollo/client';

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