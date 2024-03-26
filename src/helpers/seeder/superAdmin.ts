import { RoleCode } from '../../database/model/Role';
import { UserModel } from '../../database/model/User';
import { RoleModel } from '../../database/model/Role';
import Admin from '../../database/model/Admin';
import { EMOJIS } from '../../constants/emojis';
import { AdminModel } from '../../database/model/Admin';

export const seedSuperAdmin = async (
  roleCode: RoleCode.SUPERADMIN,
  email: string,
  name: string,
  password: string
) => {
  let roleSuperAdmin = await RoleModel.findOne({ code: roleCode });

  if (roleSuperAdmin) {
    let superAdmin = await AdminModel.find({
      roles: roleSuperAdmin._id,
      deletedAt: null,
    }).countDocuments();

    if (superAdmin > 0) {
      console.log(`${roleCode} user exist`);
    } else {
      try {
        let superAdmin = {
          roles: [roleSuperAdmin],
          verified: true,
          name,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await AdminModel.create(superAdmin as Admin);

        console.log(
          `a new ${roleCode} has been created successfully ` + EMOJIS.SUCCESS
        );
      } catch (error) {
        console.log('error : ', error);
      }
    }
  } else {
    console.log('Role user inexistant !');
  }
};
