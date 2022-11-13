import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@shared/repositories/user.repository';
import { PrismaService } from '@shared/services';

@Module({
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
