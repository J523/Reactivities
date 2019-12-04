using System;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        public IMediator _mediator { get; }
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpGet]
        public async Task<ActionResult> GetActivities()
        {
               var activities = await _mediator.Send(new List.Query()) ;
                return Ok(activities);
        }
          [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id )
        {
               var activity = await _mediator.Send(new Detail.Query(id)) ;
                return Ok(activity);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
         return await _mediator.Send(command);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id,Edit.Command command)
        {
            command.Id =id;

         return await _mediator.Send(command);

        }

         [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
         

         return await _mediator.Send(new Delete.Command(){Id=id});

        }
    }
}