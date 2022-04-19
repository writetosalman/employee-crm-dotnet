using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeWebAPI.Entities
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string FName { get; set; }

        [Required]
        public string LName { get; set; }

        [EmailAddress(ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DateOfHire { get; set; }

        public string Position { get; set; }

        public string Department { get; set; }

        public string BaseSalary { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }
    }

}