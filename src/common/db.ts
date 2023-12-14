import * as crypto from 'node:crypto';

export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}

export const createSHA256 = (line: string, salt: string): string => {
  const hashed = crypto.createHmac('sha256', salt);
  return hashed.update(line).digest('hex');
};
