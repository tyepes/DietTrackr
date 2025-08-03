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
    }
}