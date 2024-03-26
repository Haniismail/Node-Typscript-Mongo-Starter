import crypto from 'crypto';

const KEY_SIZE = 64;

export const generateKeys = () => ({
  accessTokenKey: crypto.randomBytes(KEY_SIZE).toString('hex'),
  refreshTokenKey: crypto.randomBytes(KEY_SIZE).toString('hex'),
});
