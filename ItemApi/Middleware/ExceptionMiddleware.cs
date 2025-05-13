namespace ItemApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(
            RequestDelegate requestDelegate,
            ILogger<ExceptionMiddleware> exceptionMiddleware
        )
        {
            _next = requestDelegate;
            _logger = exceptionMiddleware;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                _logger.LogInformation("Handling request: " + context.Request.Path);
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Something went wrong!");
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new { message = "Internal Server Error" });
            }
        }
    }
}
