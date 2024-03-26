import { ProtectedRequest, RoleRequest } from "app-request";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { SuccessResponse } from "../../../core/ApiResponse";
import { BadRequestError } from "../../../core/ApiError";
import { createTokens } from "../../../auth/authUtils";
import asyncHandler from "../../../helpers/asyncHandler";
import { sendEmail } from "../../../helpers/emails";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import AdminRepo from "../../../database/repository/AdminRepo";

export const adminForgotPassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const email = req.body.email;
    const user = await AdminRepo.findByEmail(email);
    if (!user) throw new BadRequestError("Invalid email");

    const confirmationToken = uuidv4();
    user.token = confirmationToken;
    await user.save();
    const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;

    sendEmail({
      email: email,
      subject: "Forgot your password ? ",
      message: "",
      template: "forgotPassword",
      variables: {
        name: user.name,
        confirmationLink,
      },
    });
    new SuccessResponse("An email has been sent to recover your password", {
    }).send(res);
  }
);
