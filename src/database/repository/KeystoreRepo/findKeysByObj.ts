import Keystore, { KeystoreModel } from '../../model/Keystore';

const findKeysByObj = (obj: object): Promise<Keystore[] | []> => {
  return KeystoreModel.find(obj)
    .select('+client +primaryKey +secondaryKey')
    .sort({ createdAt: -1 })
    .exec();
};

export default findKeysByObj;
