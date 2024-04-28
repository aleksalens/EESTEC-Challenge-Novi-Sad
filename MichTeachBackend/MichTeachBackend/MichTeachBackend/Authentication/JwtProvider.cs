using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using MichTeachBackend.Models;
using Microsoft.IdentityModel.Tokens;

namespace MichTeachBackend.Authentication
{
	public sealed class JwtProvider : IJwtProvider
	{
		public string Generate(User user)
		{
			var claims = new Claim[]
			{
				new (JwtRegisteredClaimNames.Sub, user.Id.ToString()),
				new (JwtRegisteredClaimNames.Email, user.Email),
				new (JwtRegisteredClaimNames.GivenName, user.FullName),
				new ("Id", user.Id.ToString())
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperSecretKey12345SuperSecretKey12345"));
			var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				"Mich Teach",
				"Mich Teach",
				claims,
				expires: DateTime.Now.AddHours(30),
				signingCredentials: credentials);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
