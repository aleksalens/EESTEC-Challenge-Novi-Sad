using MichTeachBackend.Data;
using MichTeachBackend.DTO;
using MichTeachBackend.Models;

namespace MichTeachBackend.Repository
{
	public class UserRepository : IUserRepository
	{
		private readonly ApplicationDbContext context;

		public UserRepository(ApplicationDbContext context)
		{
			this.context = context;
		}

		public ICollection<User> GetUsers()
		{
			return context.Users.ToList();
		}

		public User GetUser(string email, string password)
		{
			return context.Users.FirstOrDefault(u => u.Email == email && u.UserPassword == password);
		}

		public bool AddUser(UserRegisterDto userRegister)
		{
			bool userThere = context.Users.Any(u => u.Email == userRegister.Email);
			int usersCount = context.Users.Count();

			if (userThere)
			{
				return false;
			}
			context.Users.Add(new User
			{
				Id = usersCount + 1,
				FullName = userRegister.FullName,
				Email = userRegister.Email,
				UserPassword = userRegister.Password
			});

			context.SaveChanges();

			return true;
		}

	}
}
