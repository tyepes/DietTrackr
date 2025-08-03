using DietTrackr.Data;
using DietTrackr.Models;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace DietTrackr.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }        
        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> CreateUserAsync(string name, string dietType)
        {
            var user = new User
            {
            Id = Guid.NewGuid(),
            Name = name,
            DietType = dietType
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }
        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}