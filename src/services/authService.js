import { createAuthService } from '@tourmalinecore/react-tc-auth';

export const authService = createAuthService({
  authApiRoot: 'http://localhost:44492/auth', // путь к серверу аутентификации
  authType: 'ls', // тип, определяющий, где будут хранится токены. в данном случае, Local Storage

  // аксесоры параметров для объектов, которые приложение получает с бэка
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
});