export const EXPO_TOKEN = '@expo_token';
export const AUTH_TOKEN = '@auth_token';
export const EXPIRED_AUTH_TOKEN = '@expired_auth_token';

export enum EStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export const ConvertStatus: { [key: string]: string } = {
  [EStatus.IN_PROGRESS]: 'Đang xử lý',
  [EStatus.COMPLETED]: 'Đã xong',
};
