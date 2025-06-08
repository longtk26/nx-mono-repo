import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppClsModule } from './common/cls/cls.module';
import { AppGraphQLModule } from './common/graphql/graphql.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';
import { EnvModule } from './modules/env/env.module';

@Module({
  imports: [
    AppClsModule,
    AppGraphQLModule,
    PrismaModule,
    AppConfigModule,
    UsersModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
