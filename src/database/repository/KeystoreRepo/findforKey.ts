import Keystore, { KeystoreModel } from '../../model/Keystore';
import User from '../../model/User';

const findforKey = (client: User, key: string): Promise<Keystore | null> => {
  return KeystoreModel.findOne({ client: client, primaryKey: key }).exec();
};

export default findforKey;
