import User, { UserModel } from '../../model/User';

const create = async (obj: User): Promise<User> => {
  return await UserModel.create(obj);
};

export default create;
