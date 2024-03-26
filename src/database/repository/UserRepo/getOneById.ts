import User, { UserModel } from "../../model/User";

const findById = (id: string): Promise<User | null> => {
  return UserModel.findById(id).populate({ path: "roles" }).exec();
};

export default findById;
