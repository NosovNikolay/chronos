import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shared/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async registration(): Promise<any> {
    return this.userRepository.create({ login: 'as' });
  }
}
