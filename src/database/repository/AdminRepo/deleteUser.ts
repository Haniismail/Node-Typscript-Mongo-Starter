import Admin, { AdminModel } from "../../model/Admin";

const deleteUser = async (user: Admin): Promise<any> => {
  user.updatedAt = new Date();
  let email = user.email as string;
  let regex = "^old[0-9]+" + email;
  const deletedUsers = await AdminModel.count({ email: { $regex: regex } });
  return AdminModel.findByIdAndUpdate(
    user._id,
    { $set: { email: `old${deletedUsers}${email}`, deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default deleteUser;
