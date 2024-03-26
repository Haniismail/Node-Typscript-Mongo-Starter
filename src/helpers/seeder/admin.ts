import { RoleCode } from '../../database/model/Role';
import { RoleModel } from '../../database/model/Role';
import Admin from '../../database/model/Admin';
import { EMOJIS } from '../../constants/emojis';
import { AdminModel } from '../../database/model/Admin';

export const seedAdmin = async (
  roleCode: RoleCode.ADMIN,
  email: string,
  name: string,
  password: string
) => {
  let roleAdmin = await RoleModel.findOne({ code: roleCode });

  if (roleAdmin) {
    let admin = await AdminModel.find({
      roles: roleAdmin._id,
      deletedAt: null,
    }).countDocuments();

    if (admin > 0) {
      console.log(`${roleCode} user exist`);
    } else {
      try {
        let admin = {
          roles: [roleAdmin],
          verified: true,
          name,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await AdminModel.create(admin as Admin);

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
