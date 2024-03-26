import { Request } from "express";
import { Document } from "mongoose";

import User from "../database/model/User";
import Admin from "../database/model/Admin";
import Keystore from "../database/model/Keystore";

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User | Admin
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
declare interface ApiOptions {
  deleted?: boolean;
  isPaging?: boolean;
}

declare interface CommonModel extends Document {
  deletedAt?: Date | string;
  updatedAt?: Date | string;
  createdAt?: Date | string;
}
