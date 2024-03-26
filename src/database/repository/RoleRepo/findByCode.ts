import Role, { RoleModel } from '../../model/Role';

const findByCode = (code: string): Promise<Role | null> => {
  return RoleModel.findOne({ code: code }).exec();
};

export default findByCode;
