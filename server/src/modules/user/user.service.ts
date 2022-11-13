import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shared/repositories/user.repository';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.userRepository.create(data);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }
}
