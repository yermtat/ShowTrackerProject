using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.DTO;

public record ResetPasswordDTO
(
    string OldPassword,
    string NewPassword,
    string ConfirmNewPassword
);
