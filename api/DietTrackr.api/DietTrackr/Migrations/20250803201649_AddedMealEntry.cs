using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DietTrackr.Migrations
{
    /// <inheritdoc />
    public partial class AddedMealEntry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MealEntryId",
                table: "FoodItems",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MealEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TotalCalories = table.Column<double>(type: "double precision", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    MealType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealEntries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_MealEntryId",
                table: "FoodItems",
                column: "MealEntryId");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodItems_MealEntries_MealEntryId",
                table: "FoodItems",
                column: "MealEntryId",
                principalTable: "MealEntries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodItems_MealEntries_MealEntryId",
                table: "FoodItems");

            migrationBuilder.DropTable(
                name: "MealEntries");

            migrationBuilder.DropIndex(
                name: "IX_FoodItems_MealEntryId",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "MealEntryId",
                table: "FoodItems");
        }
    }
}
