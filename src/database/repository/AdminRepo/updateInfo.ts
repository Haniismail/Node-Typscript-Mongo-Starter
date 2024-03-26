import Admin, { AdminModel } from '../../model/Admin';

const updateInfo = (user: Admin): Promise<any> => {
  user.updatedAt = new Date();
  return AdminModel.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
};

export default updateInfo;
