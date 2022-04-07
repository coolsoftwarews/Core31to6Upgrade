using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Survey.Core.Domain.Questionaire
{
    [Table("Venues", Schema = "questionaire")]
    public class Venue
    { 
        [Key]
        public int Id { get; set;}
        public string Name { get; set; }
    }
}
