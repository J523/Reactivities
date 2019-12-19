using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Detail
    {
        public class Query : IRequest<Activity>
        {
            public Query(Guid id)
            {
                Id = id;

            }
            public Guid Id { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, Activity>
        {
            public DataContext _context { get; }
            public QueryHandler(DataContext context)
            {
                _context = context;

            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new { activity = "Not Found" });
                }
                return activity;
            }
        }
    }
}