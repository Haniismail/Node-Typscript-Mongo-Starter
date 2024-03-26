import { createUser } from './create.controller';
import { getAllUsers } from './getAll.controller';
import { getUser } from './getOne.controller';
import { updateUser } from './update.controller';
import { removeUser } from './remove.controller';
import { getMyProfile, updateProfile } from './profileController';

export default {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  removeUser,
  getMyProfile,
  updateProfile,
};
