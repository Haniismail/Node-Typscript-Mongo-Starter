import { ProtectedRequest } from 'app-request';
import { AuthFailureError } from '../core/ApiError';
import asyncHandler from '../helpers/asyncHandler';
import { RoleCode } from '../database/model/Role';
import { hasCommonElement } from '../helpers/utils/arrays';

export default (roles: RoleCode[]) =>
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.roles) throw new AuthFailureError('Permission denied');
    const roleCodes = req.user.roles.map((role) => role.code);
    if (hasCommonElement(roles, roleCodes)) return next();
    throw new AuthFailureError('Permission denied');
  });
