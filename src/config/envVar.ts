export const environment = process.env.NODE_ENV || '';
export const port = process.env.PORT || '';
export const baseUrl = process.env.BASE_URL || '';
export const apiPrefix = process.env.API_PREFIX || '';

export const db = {
  uri: process.env.DB_URI || '',
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  nameTest: process.env.DB_NAME_TEST || '',
};

export const corsUrl = process.env.CORS_URL;

export const tokenInfo = {
  accessTokenValidityDays: parseInt(
    process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'
  ),
  refreshTokenValidityDays: parseInt(
    process.env.REFRESH_TOKEN_VALIDITY_DAYS || '0'
  ),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

export const logDirectory = process.env.LOG_DIR || '';

export const seeder = {
  superAdminName: process.env.SUPER_ADMIN_NAME || '',
  superAdminEmail: process.env.SUPER_ADMIN_EMAIL || '',
  superAdminPass: process.env.SUPER_ADMIN_PASS || '',

  AdminName: process.env.ADMIN_NAME || '',
  AdminEmail: process.env.ADMIN_EMAIL || '',
  AdminPass: process.env.ADMIN_PASS || '',
};

export const email = {
  smtpService: process.env.SMTP_SERVICE || '',
  smtpHost: process.env.EMAIL_HOST || '',
  smtpPort: process.env.EMAIL_PORT || '',
  smtpUser: process.env.EMAIL_USERNAME || '',
  smtpPass: process.env.EMAIL_PASSWORD || '',
};
