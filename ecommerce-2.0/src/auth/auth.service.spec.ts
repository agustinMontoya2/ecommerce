import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const usersRepositoryMock = {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
  };
  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('fake.jwt.token'),
  };

  beforeEach(async () => {
    service = new AuthService(
      usersRepositoryMock as any,
      jwtServiceMock as any,
    );
    jest.clearAllMocks();
  });

  describe('signupService', () => {
    it('throw conflictException if user already exists', async () => {
      const baseDto = {
        name: 'test',
        email: 'test@example.com',
        phone: 1234567890,
        password: 'test',
        confirmPassword: 'test',
        isAdmin: false,
        role: 'user',
      };
      usersRepositoryMock.getUserByEmail.mockResolvedValue({
        email: 'test@example.com',
      });
      await expect(service.signupService(baseDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should return token', async () => {
      const baseDto = {
        name: 'test',
        email: 'test@example.com',
        phone: 1234567890,
        password: 'test',
        confirmPassword: 'test',
        isAdmin: false,
        role: 'user',
      };
      usersRepositoryMock.getUserByEmail.mockResolvedValue(null);
      usersRepositoryMock.createUser.mockResolvedValue({
        user_id: 1,
        email: 'test@example.com',
        password: 'test',
      });
      const token = await service.signupService(baseDto);
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });
    it('should hash password', async () => {
      const baseDto = {
        name: 'test',
        email: 'test@example.com',
        phone: 1234567890,
        password: 'test',
        confirmPassword: 'test',
        isAdmin: false,
        role: 'user',
      };
      const bcryptSpy = jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
        return Promise.resolve('hashedPassword123');
      });

      usersRepositoryMock.getUserByEmail.mockResolvedValue(null);
      usersRepositoryMock.createUser.mockResolvedValue({
        user_id: 1,
        email: 'test@example.com',
        password: 'test',
      });
      await service.signupService(baseDto);
      expect(bcryptSpy).toHaveBeenCalledWith('test', 10);
    });
  });
  describe('loginService', () => {
    it('should return token', async () => {
      usersRepositoryMock.getUserByEmail.mockResolvedValue({
        user_id: 1,
        email: 'test@example.com',
        password: 'test',
      });
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      const token = await service.loginService('test@example.com', 'test');
      expect(token.split('.').length).toBe(3);
    });
    it("should throw BadRequestException if user doesn't exist", async () => {
      usersRepositoryMock.getUserByEmail.mockResolvedValue(null);
      await expect(
        service.loginService('test@example.com', 'test'),
      ).rejects.toThrow(BadRequestException);
    });
    it("should throw BadRequestException if password doesn't match", async () => {
      usersRepositoryMock.getUserByEmail.mockResolvedValue({
        user_id: 1,
        email: 'test@example.com',
        password: 'test',
      });
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));
      await expect(
        service.loginService('test@example.com', 'test'),
      ).rejects.toThrow(BadRequestException);
    });
    it('should compare password with hashed password', async () => {
      usersRepositoryMock.getUserByEmail.mockResolvedValue({
        user_id: 1,
        email: 'test@example.com',
        password: 'test',
      });
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      await service.loginService('test@example.com', 'test');
      expect(bcrypt.compare).toHaveBeenCalledWith('test', 'test');
    });
  });
});
