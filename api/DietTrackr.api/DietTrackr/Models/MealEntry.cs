using System;
using System.Collections.Generic;

namespace DietTrackr.Models
{
    public class MealEntry
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateTime { get; set; }
        public List<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
        public double TotalCalories { get; set; }
        public string? Notes { get; set; }
        public MealType MealType { get; set; }
    }

    public enum MealType
    {
        Breakfast,
        Lunch,
        Dinner,
        Snack,
        Other
    }
}