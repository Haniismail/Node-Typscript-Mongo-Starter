import { Tokens } from "app-request";
import { AuthFailureError, InternalError } from "../core/ApiError";
import JWT, { JwtPayload } from "../core/JWT";
import { Types } from "mongoose";
import User from "../database/model/User";
import { tokenInfo } from "../config/envVar";
import Admin from "../database/model/Admin";

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError("Invalid Authorization");
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("Invalid Authorization");
  return authorization.split(" ")[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.isAdmin === undefined ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !Types.ObjectId.isValid(payload.sub) ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new AuthFailureError("Invalid Access Token");
  return true;
};

export const createTokens = async (
  user: User | Admin,
  accessTokenKey: string,
  refreshTokenKey: string,
  isAdmin: boolean = false
): Promise<Tokens> => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      accessTokenKey,
      tokenInfo.accessTokenValidityDays,
      isAdmin
    )
  );
  if (!accessToken) throw new InternalError();

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      refreshTokenKey,
      tokenInfo.refreshTokenValidityDays,
      isAdmin
    )
  );

  if (!refreshToken) throw new InternalError();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};
