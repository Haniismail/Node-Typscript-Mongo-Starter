import Admin, { AdminModel } from '../../model/Admin';
import { Types } from 'mongoose';

const findProfileById = (id: Types.ObjectId): Promise<Admin | null> => {
  return AdminModel.findOne({ _id: id, status: true })
    .select('+name +lastname +roles +email')
    .populate({
      path: 'roles',
      match: { status: true },
      select: { code: 1 },
    })
    .exec();
};

export default findProfileById;
