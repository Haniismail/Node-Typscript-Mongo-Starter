import Admin, { AdminModel } from '../../model/Admin';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';
import { ApiOptions } from 'app-request';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions,
): Promise<PaginationModel<Admin>> => {
  let findAllQuery = apiOptions.deleted
    ? AdminModel.find({ deletedAt: { $ne: null } })
    : AdminModel.find({ deletedAt: null });

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

export default findAll;
