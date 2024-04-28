using MichTeachBackend.DTO;
using MichTeachBackend.Models;

namespace MichTeachBackend.Repository
{
	public interface IUserRepository
	{
		ICollection<User> GetUsers();

		User GetUser(string email, string password);
		bool AddUser(UserRegisterDto userRegister);
	}
}