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
    }
}