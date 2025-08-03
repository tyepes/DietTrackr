using DietTrackr.Models;

namespace DietTrackr.Services
{
    public interface IUserService
    {
        Task<List<User>> GetUsersAsync();
        Task<User> CreateUserAsync(string name, string dietType);
        Task<User?> GetUserByIdAsync(Guid id);

    }
}
