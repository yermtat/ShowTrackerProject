using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService.Validators;

internal class RegexPatterns
{
    public const string usernamePattern = @"(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_*&%$#@]).{5,}";
    public const string passwordPattern = @"(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_*&%$#@]).{8,}";
}
