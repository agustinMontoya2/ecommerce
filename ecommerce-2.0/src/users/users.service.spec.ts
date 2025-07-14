import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  describe('UsersService - createUser', () => {
    let service: UsersService;

    const usersRepositoryMock = {
      createUser: jest.fn(),
      getUserByEmail: jest.fn(),
    };

    beforeEach(async () => {
      service = new UsersService(usersRepositoryMock as any);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
