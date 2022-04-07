using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Survey.Core.Domain.Questionaire
{
    [Table("Answers", Schema = "questionaire")]
    public class Answer
    {
        [Key]
        public long Id { get; set; }
        public int QuestionId { get; set; }
        public long UserId { get; set; }
        public bool IsTrue { get; set; } 
        public DateTime DateCreated { get; set; }
        public MainForm MainForm { get; set; }
        public Question Question { get; set; }
    }
}
