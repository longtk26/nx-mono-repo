import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

export class BaseRepository<T, C, O> {
  protected model: string;
  protected readonly prisma: TransactionHost<TransactionalAdapterPrisma>;

  constructor(txHost: TransactionHost<TransactionalAdapterPrisma>) {
    this.prisma = txHost;
  }

  async create({ data }: { data: C }): Promise<T> {
    return this.prisma.tx[this.model].create({
      data,
    });
  }

  async findAll({ options }: { options?: Partial<O> }): Promise<T[]> {
    return this.prisma.tx[this.model].findMany({
      ...options,
    });
  }

  async findOne({
    id,
    options,
  }: {
    id: string;
    options?: Partial<O>;
  }): Promise<T | null> {
    return this.prisma.tx[this.model].findUnique({
      where: { id },
      ...options,
    });
  }

  async update({ id, data }: { id: string; data: Partial<C> }): Promise<T> {
    return this.prisma.tx[this.model].update({
      where: { id },
      data,
    });
  }

  async delete({ id }: { id: string }): Promise<T> {
    return this.prisma.tx[this.model].delete({
      where: { id },
    });
  }
}
