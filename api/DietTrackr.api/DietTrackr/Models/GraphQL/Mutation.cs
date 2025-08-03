using DietTrackr.Data;
using DietTrackr.Services;
using HotChocolate;

namespace DietTrackr.Models
{
    public class Mutation
    {
        public async Task<User> CreateUserAsync(string name, string dietType, [Service] IUserService userService)
        {
            return await userService.CreateUserAsync(name, dietType);
        }
        public async Task<MealEntry> CreateMealEntryAsync(Guid userId, DateTime dateTime, List<FoodItem> foodItems, double totalCalories, string? notes, MealType mealType, [Service] IMealLogService mealService)
        { 
            return await mealService.CreateMealEntryAsync(userId, dateTime, foodItems, totalCalories, notes, mealType);
        }
    }
}