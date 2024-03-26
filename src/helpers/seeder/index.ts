import { seedRoles } from './roles';
import { seedSuperAdmin } from './superAdmin';
import { seedAdmin } from './admin';
import { RoleCode } from '../../database/model/Role';
import { seeder } from '../../config/envVar';
import { environment } from '../../config/envVar';
import { seedDelete } from './drop';
import '../../database';

export let seed = async (args = { clearDatabase: false }) => {
  if (args.clearDatabase) await seedDelete();
  await seedRoles([RoleCode.SUPERADMIN, RoleCode.ADMIN, RoleCode.USER]);
  await seedSuperAdmin(
    RoleCode.SUPERADMIN,
    seeder.superAdminEmail,
    seeder.superAdminName,
    seeder.superAdminPass
  );
  await seedAdmin(
    RoleCode.ADMIN,
    seeder.AdminEmail,
    seeder.AdminName,
    seeder.AdminPass
  );

  environment !== 'test' && process.exit(1);
};

seed({ clearDatabase: environment === 'test' });
