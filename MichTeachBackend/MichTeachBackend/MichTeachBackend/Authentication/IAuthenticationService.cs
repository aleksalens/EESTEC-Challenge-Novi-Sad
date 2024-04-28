namespace MichTeachBackend.Authentication
{
	public interface IAuthenticationService
	{
		string Authenticate(string email, string password);
	}
}