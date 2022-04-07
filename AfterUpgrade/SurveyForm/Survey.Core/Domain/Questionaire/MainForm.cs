using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Survey.Core.Domain.Questionaire
{
    [Table("MainForm", Schema = "questionaire")]
    public class MainForm
    {
        [Key]
        public long Id { get; set; }
        public int VenueId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public Guid ResourceId { get; set; } //uniquely identity for the form

        public DateTime DateCreated { get; set; }
        
        public Venue Venue { get; set; }
        public List<Answer> Answers { get; set; }


    }
}
