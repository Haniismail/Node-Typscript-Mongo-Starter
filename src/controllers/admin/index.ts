import { createAdmin } from "./createAdmin.controller";
import { deleteAdmin } from "./deleteAdmin.controller";
import { getAdmin } from "./getAdmin.controller";
import { updateAdmin } from "./updateAdmin.controller";
import { getAllAdmins } from "./getAllAdmins.controller";
import countaAllAdmins from "./countAll.controller";
import { getAllNonAdmins } from "./getAllNonAdmins.controller";
import { getMyProfile } from "../admin/auth/getMe";

export default {
  createAdmin,
  deleteAdmin,
  getAdmin,
  updateAdmin,
  getAllAdmins,
  countaAllAdmins,
  getAllNonAdmins,
  getMyProfile,
};
