namespace DietTrackr.Models
{
    public class Mutation
    {
        public User CreateUser(string name, string dietType)
        {
            return new User
            {
                Id = Guid.NewGuid(),
                Name = name,
                DietType = dietType
            };
        }
    }
}