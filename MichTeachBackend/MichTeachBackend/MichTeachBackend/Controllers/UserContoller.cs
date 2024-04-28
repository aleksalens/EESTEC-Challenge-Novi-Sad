using MichTeachBackend.Authentication;
using MichTeachBackend.DTO;
using MichTeachBackend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MichTeachBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserContoller : Controller
	{
		private readonly IUserRepository userRepository;
		private readonly IJwtProvider jwtProvider;

		public UserContoller(IUserRepository userRepository, IJwtProvider jwtProvider)
		{
			this.userRepository = userRepository;
			this.jwtProvider = jwtProvider;
		}

		[HttpGet]
		public IActionResult GetUsers()
		{
			var users = userRepository.GetUsers();
			return Ok(users);
		}

		[HttpPost("login")]
		public IActionResult Login([FromBody] UserLoginDto userLogin)
		{
			var user = userRepository.GetUser(userLogin.Email, userLogin.Password);
			if (user == null)
			{
				return BadRequest("Invalid email or password");
			}

			var token = jwtProvider.Generate(user);

			return Ok(token);
		}

		[HttpPost("register")]
		public IActionResult Register([FromBody] UserRegisterDto userRegister)
		{
			var flag = userRepository.AddUser(userRegister);
			if (!flag)
			{
				return BadRequest("User with this email already exists");
			}

			return Ok(flag);
		}
	}
}
