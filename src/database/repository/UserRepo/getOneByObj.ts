import User, { UserModel } from '../../model/User';

const findByObj = (obj: object): Promise<User | null> => {
  return UserModel.findOne(obj).exec();
};

export default findByObj;
