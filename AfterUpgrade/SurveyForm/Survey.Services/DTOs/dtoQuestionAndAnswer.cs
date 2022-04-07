using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Survey.Services.DTOs
{
    public class dtoQuestionAndAnswer
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public bool IsTrue { get; set; }
      }
}
