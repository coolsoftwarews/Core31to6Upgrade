using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Survey.Core.Domain.Core
{
    [Table("UserRoles", Schema ="core")]
    public class UserRole
    {
        public int ID { get; set; }

        public int RoleID { get; set; }

        public int UserID { get; set; }
        
        public Role Role { get; set; }
    }
}
