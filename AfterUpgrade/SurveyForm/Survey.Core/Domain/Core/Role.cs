using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Survey.Core.Domain.Core
{
    [Table("Roles", Schema="core")]
    public class Role
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string LongName { get; set; }

        public string ShortName { get; set; }

        public int Code { get; set; }

        public bool IsActive { get; set; }
        public string SystemName { get; set; }

    }
}
