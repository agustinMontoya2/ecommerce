import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceMock: AuthService;
  const resMock = { cookie: jest.fn() };

  beforeEach(async () => {
    authServiceMock = {
      loginService: jest.fn().mockResolvedValue('fake.jwt.token'),
      signupService: jest.fn().mockResolvedValue('fake.jwt.token'),
    } as unknown as AuthService;
    controller = new AuthController(authServiceMock as AuthService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('calls authService.loginService', async () => {
      await controller.login(
        {
          email: 'test@example.com',
          password: 'test',
        },
        resMock as any,
      );
      expect(authServiceMock.loginService).toHaveBeenCalledWith(
        'test@example.com',
        'test',
      );
    });
    it('saves a cookie', async () => {
      await controller.login(
        {
          email: 'test@example.com',
          password: 'test',
        },
        resMock as any,
      );
      expect(resMock.cookie).toHaveBeenCalledWith(
        'SESSION',
        'fake.jwt.token',
        expect.any(Object),
      );
    });
  });

  describe('signup', () => {
    it('calls authService.signupService', async () => {
      await controller.signUp(
        {
          name: 'test',
          email: 'test@example.com',
          phone: 1234567890,
          password: 'test',
          confirmPassword: 'test',
          role: 'user',
        },
        resMock as any,
      );
      expect(authServiceMock.signupService).toHaveBeenCalledWith({
        name: 'test',
        email: 'test@example.com',
        phone: 1234567890,
        password: 'test',
        confirmPassword: 'test',
      });
    });
    it('saves a cookie', async () => {
      await controller.signUp(
        {
          name: 'test',
          email: 'test@example.com',
          phone: 1234567890,
          password: 'test',
          confirmPassword: 'test',
          role: 'user',
        },
        resMock as any,
      );
      expect(resMock.cookie).toHaveBeenCalledWith(
        'SESSION',
        'fake.jwt.token',
        expect.any(Object),
      );
    });
  });
});
