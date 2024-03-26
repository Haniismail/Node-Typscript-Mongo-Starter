import Admin, { AdminModel } from '../../model/Admin';
import KeystoreRepo from '../KeystoreRepo';
import Keystore from '../../model/Keystore';

const update = async (
  user: Admin,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<{ user: Admin; keystore: Keystore }> => {
  user.updatedAt = new Date();
  await AdminModel.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
  const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
  return { user: user, keystore: keystore };
};

export default update;
