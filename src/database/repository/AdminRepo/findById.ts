import Admin, { AdminModel } from '../../model/Admin';
import { Types } from 'mongoose';

const findById = (id: Types.ObjectId): Promise<Admin | null> => {
  return AdminModel.findOne({ _id: id, status: true })
    .select('+email +password +roles +_id')
    .populate({
      path: 'roles',
      match: { status: true },
    })
    .exec();
};

export default findById;
