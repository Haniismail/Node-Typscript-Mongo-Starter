import { RoleRequest } from 'app-request';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from '../../core/ApiResponse';
import User from '../../database/model/User';
import { RoleCode } from '../../database/model/Role';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';
import RoleRepo from '../../database/repository/RoleRepo';

export const signup = asyncHandler(async (req: RoleRequest, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    userName,
    userType,
  } = req.body;
  let user = await UserRepo.getOneByObj({ email });
  if (user) throw new BadRequestError('User already registered');

  const roleUser = await RoleRepo.findByCode(RoleCode.USER);
  if (!roleUser) throw new BadRequestError('role not found');

  const confirmationToken = uuidv4();
  const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;
  const createdUser = await UserRepo.create({
    firstName,
    lastName,
    email,
    userType,
    phoneNumber,
    password,
    token: confirmationToken,
    verified: false,
    userName,
    roles: [roleUser._id],
  } as User);

  sendEmail({
    email: createdUser.email,
    subject: 'confirme ton email',
    message: '',
    template: 'emailConfirmationLink',
    variables: {
      name: createdUser.firstName,
      confirmationLink,
    },
  });

  new SuccessResponse('La confirmation par e-mail a été envoyée', user).send(
    res
  );
});
