// filepath: /home/tomas-yepes/Projects/DietTrackr/api/DietTrackr.api/DietTrackr/Services/MealLogService.cs
using DietTrackr.Models;
using DietTrackr.Services;
using DietTrackr.Data;
using Microsoft.EntityFrameworkCore;

namespace DietTrackr.Services
{
    public class MealLogService : IMealLogService
    {
        private readonly AppDbContext _context;

        public MealLogService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MealEntry> CreateMealEntryAsync(Guid userId, DateTime dateTime, List<FoodItem> foodItems, double totalCalories, string? notes, MealType mealType)
        {
            var entry = new MealEntry
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                DateTime = dateTime,
                MealType = mealType,
                Notes = notes,
                FoodItems = foodItems,
                TotalCalories = totalCalories
            };

            _context.MealEntries.Add(entry);
            await _context.SaveChangesAsync();

            return entry;
        }

        public async Task<List<MealEntry>> GetMealsForUserAsync(Guid userId)
        {
            return await _context.MealEntries
                .Include(m => m.FoodItems)
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.DateTime)
                .ToListAsync();
        }

        public async Task<List<MealEntry>> GetMealsByDateAsync(Guid userId, DateTime date)
        {
            var start = date.Date;
            var end = start.AddDays(1);

            return await _context.MealEntries
                .Include(m => m.FoodItems)
                .Where(m => m.UserId == userId && m.DateTime >= start && m.DateTime < end)
                .ToListAsync();
        }
    }
}