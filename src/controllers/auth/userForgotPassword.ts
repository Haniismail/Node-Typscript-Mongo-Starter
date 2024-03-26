import { ProtectedRequest } from 'app-request';
import crypto from 'crypto';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';

export const userForgotPassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { email } = req.body;

    let user = await UserRepo.getOneByObj({ email });
    if (!user) throw new BadRequestError('Invalid email');

    const resetCode = crypto.randomInt(111111, 999999).toString();
    user.resetCode = resetCode;

    await UserRepo.update(user._id, { resetCode });

    sendEmail({
      email: user.email,
      subject: 'forget Password',
      message: '',
      template: 'emailConfirmationCode',
      variables: {
        code: resetCode,
      },
    });

    return new SuccessMsgResponse('an email have been sent').send(res);
  }
);
