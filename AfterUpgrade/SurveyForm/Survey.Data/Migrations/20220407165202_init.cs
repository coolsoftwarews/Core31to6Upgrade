using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Survey.Data.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "questionaire");

            migrationBuilder.CreateTable(
                name: "Questions",
                schema: "questionaire",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Venues",
                schema: "questionaire",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MainForm",
                schema: "questionaire",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VenueId = table.Column<int>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    ResourceId = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MainForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MainForm_Venues_VenueId",
                        column: x => x.VenueId,
                        principalSchema: "questionaire",
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                schema: "questionaire",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionId = table.Column<int>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    IsTrue = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalSchema: "questionaire",
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Answers_MainForm_UserId",
                        column: x => x.UserId,
                        principalSchema: "questionaire",
                        principalTable: "MainForm",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "questionaire",
                table: "Questions",
                columns: new[] { "Id", "IsActive", "Name" },
                values: new object[,]
                {
                    { 1, true, "Do you like apples?" },
                    { 2, true, "Do you drink coffee?" },
                    { 3, true, "Do you drink water?" },
                    { 4, true, "Do you eat pizza?" },
                    { 5, true, "Do you have yacht?" },
                    { 6, true, "Do you swim?" }
                });

            migrationBuilder.InsertData(
                schema: "questionaire",
                table: "Venues",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Claremont Shopping Mall" });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                schema: "questionaire",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_UserId",
                schema: "questionaire",
                table: "Answers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MainForm_VenueId",
                schema: "questionaire",
                table: "MainForm",
                column: "VenueId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers",
                schema: "questionaire");

            migrationBuilder.DropTable(
                name: "Questions",
                schema: "questionaire");

            migrationBuilder.DropTable(
                name: "MainForm",
                schema: "questionaire");

            migrationBuilder.DropTable(
                name: "Venues",
                schema: "questionaire");
        }
    }
}
