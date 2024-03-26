import { Request } from 'express';

import { SuccessMsgResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';

export const sendTextEmail = asyncHandler(async (req: Request, res) => {
  const { to, subject, text } = req.body;
  sendEmail({
    email: to,
    subject,
    message: text,
  });
  new SuccessMsgResponse('Email has been sent Successfully!').send(res);
});

export const sendHtmlEmail = asyncHandler(async (req: Request, res) => {
  const { to, subject, template } = req.body;
  sendEmail({
    email: to,
    subject,
    message: '',
    template,
  });
  new SuccessMsgResponse('Email has been sent Successfully!').send(res);
});
