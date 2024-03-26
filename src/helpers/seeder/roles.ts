import { RoleModel } from '../../database/model/Role';
import { RoleCode } from '../../database/model/Role';
import { EMOJIS } from '../../constants/emojis';

const createRole = (code: string) => ({
  code,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const seedRoles = async (roles: RoleCode[]) => {
  try {
    let notCreatedRole: RoleCode[] = [];
    for (const role of roles) {
      const roleFound = await RoleModel.findOne({ code: role });
      if (!roleFound) {
        await RoleModel.create(createRole(role));
        console.info(`\n${EMOJIS.SUCCESS}\tRole ${role} created! \n`);
      } else {
        notCreatedRole.push(role);
      }
    }
    if (notCreatedRole.length > 0) {
      console.info(
        `\n${EMOJIS.SUCCESS}\tRoles ${notCreatedRole.join(
          ', '
        )} already exist! \n`
      );
    }
  } catch (err) {
    console.error('Error seeding roles:', err);
  }
};
