import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { AppGraphQLModule } from './common/graphql/graphql.module';
import { UsersModule } from './modules/users/users.module';
import { AppClsModule } from './common/cls/cls.module';

@Module({
  imports: [PrismaModule, AppGraphQLModule, UsersModule, AppClsModule],
})
export class AppModule {}
