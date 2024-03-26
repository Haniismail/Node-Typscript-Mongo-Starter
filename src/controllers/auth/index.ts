import { login } from './login.controller';
import { signup } from './signup.controller';
import { refreshToken } from './refreshToken.controller';
import { logout } from './logout.controller';
import { confirmEmail } from './confirmEmail.controller';
import { userForgotPassword } from './userForgotPassword';
import { userResetPassword } from './userResetPassword';

export default {
  confirmEmail,
  login,
  signup,
  refreshToken,
  logout,
  userForgotPassword,
  userResetPassword,
};
