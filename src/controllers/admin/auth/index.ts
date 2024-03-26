import { login } from './login.controller';
import { signup } from './signup.controller';
import { refreshToken } from './refreshToken.controller';
import { logout } from './logout.controller';
import { confirmEmail } from './confirmEmail.controller';
import { adminForgotPassword } from './adminForgotPassword';
import { adminResetPassword } from './adminResetPassword';
import { getMyProfile } from './getMe';



export default {
  confirmEmail,
  login,
  signup,
  refreshToken,
  logout,
  adminResetPassword,
  adminForgotPassword,
  getMyProfile
};
