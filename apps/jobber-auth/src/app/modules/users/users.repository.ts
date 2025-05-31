import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { User as PrismaUser, Prisma } from '@prisma-clients/jobber-auth';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

@Injectable()
export class UserRepository extends BaseRepository<
  PrismaUser,
  Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>,
  Prisma.UserWhereInput
> {
  protected model = 'user';

  constructor(txHost: TransactionHost<TransactionalAdapterPrisma>) {
    super(txHost);
  }
}
