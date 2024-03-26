import Admin, { AdminModel } from '../../model/Admin';


const findByObj = (obj: object): Promise<Admin | null> => {
  return AdminModel.findOne(obj)
    .select('+roles +email')
    .populate({
      path: 'roles',
      match: { status: true },
      select: { code: 1 },
    })
    .exec();
};

export default findByObj;
