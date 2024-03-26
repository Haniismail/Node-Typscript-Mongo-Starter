import User, { UserModel } from '../../model/User';

const update = async (id: string, obj: Partial<User>): Promise<User | null> => {
  return await UserModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  ).exec();
};

export default update;
