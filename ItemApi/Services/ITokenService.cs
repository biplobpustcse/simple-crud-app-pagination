namespace ItemApi.Services
{
    public interface ITokenService
    {
        string GenerateToken(string username);
    }
}
