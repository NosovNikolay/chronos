import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaService } from '@shared/services';

@Module({
  imports: [AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
