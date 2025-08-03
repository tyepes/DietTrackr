using DietTrackr.Models;
namespace DietTrackr.Services
{
    public interface IMealLogService
    {
        Task<MealEntry> CreateMealEntryAsync(Guid userId, DateTime dateTime, List<FoodItem> foodItems, double totalCalories, string? notes, MealType mealType);
        Task<List<MealEntry>> GetMealsForUserAsync(Guid userId);
        Task<List<MealEntry>> GetMealsByDateAsync(Guid userId, DateTime date);
    }
}    
