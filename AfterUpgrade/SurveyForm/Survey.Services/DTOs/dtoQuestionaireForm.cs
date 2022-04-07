using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Survey.Services.DTOs
{
    public class dtoQuestionaireForm
    {
        public dtoQuestionaireForm()
        {
            this.QuestionsAndAnswers = this.QuestionsAndAnswers ?? new List<dtoQuestionAndAnswer>();
            this.VenueLookupList = this.VenueLookupList ?? new List<dtoVenues>();
        }
        public long UserId { get; set; }
        public int VenueId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool IsCompliant { get; set; }
        public Guid ResourceId { get; set; }
        public List<dtoQuestionAndAnswer> QuestionsAndAnswers { get; set; }
        public List<dtoVenues> VenueLookupList { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
