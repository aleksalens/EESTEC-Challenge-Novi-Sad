using MichTeachBackend.Models;

namespace MichTeachBackend.Authentication
{
	public interface IJwtProvider
	{
		string Generate(User user);
	}
}