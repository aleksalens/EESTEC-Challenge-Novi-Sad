﻿using System.ComponentModel.DataAnnotations;

namespace MichTeachBackend.DTO
{
	public class UserRegisterDto
	{
		public int Id { get; set; }

		[Required]
		public string FullName { get; set; }

		
		[Required, MinLength(6)]
		public string Password { get; set; }

		[Required, EmailAddress]
		public string Email { get; set; }

	}
}
