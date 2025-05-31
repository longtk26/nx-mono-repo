import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma-clients/jobber-auth';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('PrismaService connected to the database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('PrismaService disconnected from the database');
  }
}
