using DietTrackr.Models;
using DietTrackr.Data;
using HotChocolate;
using HotChocolate.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using DietTrackr.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services
    .AddScoped<IUserService, UserService>()
    .AddScoped<IMealLogService, MealLogService>();
// Add GraphQL services to the container.
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()

    .ModifyRequestOptions(options =>
    {
        if (builder.Environment.IsDevelopment())
        {
            options.IncludeExceptionDetails = true;
        }
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();