import { AdminModel } from '../../model/Admin';

const countAll = async (): Promise<number> => {
  return await AdminModel.find({
    deletedAt: null,
  }).countDocuments();
};

export default countAll;
