using DietTrackr.Data;
using DietTrackr.Services;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace DietTrackr.Models
{
    public class Query
    {
        public async Task<List<User>> GetUsersAsync([Service] IUserService userService)
        {
            return await userService.GetUsersAsync();
        }

        public async Task<User?> GetUserByIdAsync(Guid id, [Service] IUserService userService)
        {
            return await userService.GetUserByIdAsync(id);
        }
        public async Task<List<MealEntry>> GetMealsForUserAsync(Guid userId, [Service] IMealLogService mealLogService)
        {
            return await mealLogService.GetMealsForUserAsync(userId);
        }
        public async Task<List<MealEntry>> GetMealsByDateAsync(Guid userId, DateTime date, [Service] IMealLogService mealLogService)
        {
            return await mealLogService.GetMealsByDateAsync(userId, date);
        }
    }
}