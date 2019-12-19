using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middlewares
{
    public class ExceptionHandler
    {
        public ExceptionHandler(RequestDelegate _next)
        {
            this._next = _next;

        }
        private RequestDelegate _next { get; }
        private ILogger<ExceptionHandler> _logger { get; }
    

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {

                await HandleException(ex, context, _logger);

            }

        }

        private async Task HandleException(Exception ex, HttpContext context, ILogger<ExceptionHandler> logger)
        {
            object errors = null;
            switch (ex)
            {

                case RestException re:
                    {
                      
                        errors = re.Errors;
                        context.Response.StatusCode = (int)re.Code;
                        break;
                    }

                case Exception e:
                    {
                            //    _logger.LogError(ex, "SERVER ERROR");
                        errors = String.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                    }

            }

            context.Response.ContentType = "application/json";
            if(errors !=null)
            {
                var result = JsonSerializer.Serialize(new {errors});
                await context.Response.WriteAsync(result);
            }
           
        }
    }
}