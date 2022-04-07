using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Survey.Core.Domain.Core
{
    [Table("Users", Schema="core")]
    public class User 
    {
        public User()
        {
        }

        [Key]
        public int ID { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string FullName { get { return $"{FirstName} {LastName}"; } }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool IsActive { get; set; }

        public bool IsB2C { get; set; }

        public ICollection<UserRole> UserRole { get; set; }
        
    }
}
