namespace DietTrackr.Models
{
    public class Query
    {
        public List<User> GetUsers() => new List<User>
        {
            new User { Id = Guid.NewGuid(), Name = "Tom", DietType = "Carnivore" },
            new User { Id = Guid.NewGuid(), Name = "Ana", DietType = "Keto" }
        };
    }
}