import Admin, { AdminModel } from '../../model/Admin';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';
import { ApiOptions } from 'app-request';
import { Types } from 'mongoose';
import { RoleModel } from '../../model/Role';

type pagingObj = {
  limit: number;
  page: number;
};
//To be fixed when merged
const getAllNonAdmins = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions,
): Promise<PaginationModel<Admin>> => {
  const userRoleId = (await RoleModel.findOne({ code: 'USER' }).select('_id'))?._id;

  let findAllQuery = apiOptions.deleted
    ? AdminModel.find({
        deletedAt: { $ne: null },
        roles: [userRoleId],
      })
    : AdminModel.find({
        deletedAt: null,
        roles: [userRoleId],
      });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['name', 'email']);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await AdminModel.paginate(options)) as PaginationModel<Admin>;
};

export default getAllNonAdmins;
