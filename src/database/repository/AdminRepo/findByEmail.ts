import Admin, { AdminModel } from "../../model/Admin";

const findByEmail = (email: string): Promise<Admin | null> => {
  return AdminModel.findOne({ email: email, status: true })
    .select("+email +password +roles +verified -status")
    .populate({
      path: "roles",
      match: { status: true },
      select: { code: 1 },
    })
    .exec();
};

export default findByEmail;
