namespace DietTrackr.Models
{
    public class FoodItem
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double Calories { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fats { get; set; }
        public FoodType Type { get; set; }
    }

    public enum FoodType
    {
        Fruit,
        Vegetable,
        Protein,
        Grain,
        Dairy,
        Snack,
        Beverage,
        Other
    }
}