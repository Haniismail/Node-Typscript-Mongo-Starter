import User, { UserModel } from '../../model/User';

const remove = async (id: string): Promise<User | null> => {
  return await UserModel.findByIdAndUpdate(
    id,
    { $set: { deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default remove;
