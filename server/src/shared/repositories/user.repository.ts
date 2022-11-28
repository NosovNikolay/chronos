import { PrismaService } from '@shared/services';
import { User, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithDefaultCalendar(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        calendars: {
          create: [
            {
              title: `${data.username} root calendar`,
            },
          ],
        },
      },
    });
  }

  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
