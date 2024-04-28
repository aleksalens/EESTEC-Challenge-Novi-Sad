using System.Security.Authentication;
using MichTeachBackend.Repository;

namespace MichTeachBackend.Authentication
{
	public sealed class AuthenticationService : IAuthenticationService
	{
		private readonly IJwtProvider jwtProvider;

		private readonly IUserRepository userRepository;

		public AuthenticationService(IJwtProvider jwtProvider, IUserRepository userRepository)
		{
			this.jwtProvider = jwtProvider;
			this.userRepository = userRepository;
		}

		public string Authenticate(string email, string password)
		{
			var user = userRepository.GetUser(email, password);
			if (user == null)
			{
				throw new AuthenticationException("Invalid email or password");
			}

			return jwtProvider.Generate(user);
		}
	}
}
