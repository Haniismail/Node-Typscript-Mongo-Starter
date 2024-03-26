import Admin, { AdminModel } from '../../model/Admin';
import Role, { RoleModel } from '../../model/Role';
import { InternalError } from '../../../core/ApiError';

const create = async (user: Admin, roleCode: string, verified?: boolean): Promise<Admin> => {
  const now = new Date();

  const role = await RoleModel.findOne({ code: roleCode }).lean<Role>().exec();
  if (!role) throw new InternalError('Role must be defined');

  user.roles = [role._id];
  user.verified = verified ? true : false;
  user.createdAt = user.updatedAt = now;
  const createdUser = (await AdminModel.create(user)).populate({
    path: 'roles',
    match: { status: true },
    select: { code: 1 },
  });
  return createdUser;
};

export default create;
