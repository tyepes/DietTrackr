namespace DietTrackr.Models
{
    public class User {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string DietType { get; set; }    
    }
}