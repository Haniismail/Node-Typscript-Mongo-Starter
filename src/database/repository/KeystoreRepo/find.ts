import Keystore, { KeystoreModel } from '../../model/Keystore';
import User from '../../model/User';

const find = async (
  client: User,
  primaryKey: string,
  secondaryKey: string
): Promise<Keystore | null> => {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
  }).exec();
};

export default find;
