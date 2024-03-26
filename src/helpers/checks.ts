import 'dotenv/config';

import {
  environment,
  port,
  baseUrl,
  db,
  corsUrl,
  tokenInfo,
  logDirectory,
  seeder,
  apiPrefix,
  email,
} from '../config/envVar';
import { EMOJIS } from '../constants/emojis';

export const checkAllEnsAreNotEmpty = () => {
  const envs = [
    environment,
    port,
    baseUrl,
    db.uri,
    db.name,
    db.host,
    db.port,
    db.nameTest,
    apiPrefix,
    corsUrl,
    tokenInfo.accessTokenValidityDays,
    tokenInfo.refreshTokenValidityDays,
    tokenInfo.issuer,
    tokenInfo.audience,
    logDirectory,
    seeder.superAdminName,
    seeder.superAdminEmail,
    seeder.superAdminPass,
    email.smtpService,
    email.smtpHost,
    email.smtpPort,
    email.smtpUser,
    email.smtpPass,
  ];
  envs.forEach((env) => {
    if (!env) {
      console.error(`\n${EMOJIS.PROHIBITED}\tOne of the environment variables is not set! \n`);
      process.exit(0);
    }
  });
  console.info(`\n${EMOJIS.SUCCESS}\tAll environment variables are set! \n`);
};

checkAllEnsAreNotEmpty();
