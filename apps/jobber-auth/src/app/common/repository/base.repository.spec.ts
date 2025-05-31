import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { BaseRepository } from './base.repository';

// Define types for testing
type TestEntity = {
  id: string;
  name: string;
};

type TestCreateInput = {
  name: string;
};

type TestOptions = {
  include: Record<string, boolean>;
};

// Create a concrete implementation of BaseRepository for testing
class TestRepository extends BaseRepository<
  TestEntity,
  TestCreateInput,
  TestOptions
> {
  constructor(txHost: TransactionHost<TransactionalAdapterPrisma>) {
    super(txHost);
    this.model = 'test'; // Set model name for testing
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository;
  let mockTxHost: TransactionHost<TransactionalAdapterPrisma>;

  // Mock data
  const testEntity: TestEntity = { id: '1', name: 'Test Entity' };
  const createInput: TestCreateInput = { name: 'Test Entity' };
  const options: Partial<TestOptions> = { include: { related: true } };

  beforeEach(() => {
    // Create mock for TransactionHost
    mockTxHost = {
      tx: {
        test: {
          create: jest.fn().mockResolvedValue(testEntity),
          findMany: jest.fn().mockResolvedValue([testEntity]),
          findUnique: jest.fn().mockResolvedValue(testEntity),
          update: jest
            .fn()
            .mockResolvedValue({ ...testEntity, name: 'Updated Entity' }),
          delete: jest.fn().mockResolvedValue(testEntity),
        },
      },
    } as unknown as TransactionHost<TransactionalAdapterPrisma>;

    repository = new TestRepository(mockTxHost);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new entity', async () => {
      const result = await repository.create({ data: createInput });

      expect(mockTxHost.tx.test.create).toHaveBeenCalledWith({
        data: createInput,
      });
      expect(result).toEqual(testEntity);
    });
  });

  describe('findAll', () => {
    it('should return all entities without options', async () => {
      const result = await repository.findAll({});

      expect(mockTxHost.tx.test.findMany).toHaveBeenCalledWith({});
      expect(result).toEqual([testEntity]);
    });

    it('should return all entities with options', async () => {
      const result = await repository.findAll({ options });

      expect(mockTxHost.tx.test.findMany).toHaveBeenCalledWith(options);
      expect(result).toEqual([testEntity]);
    });
  });

  describe('findOne', () => {
    it('should find entity by id without options', async () => {
      const result = await repository.findOne({ id: '1' });

      expect(mockTxHost.tx.test.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(testEntity);
    });

    it('should find entity by id with options', async () => {
      const result = await repository.findOne({ id: '1', options });

      expect(mockTxHost.tx.test.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        ...options,
      });
      expect(result).toEqual(testEntity);
    });
  });

  describe('update', () => {
    it('should update an entity', async () => {
      const updatedData = { name: 'Updated Entity' };
      const result = await repository.update({ id: '1', data: updatedData });

      expect(mockTxHost.tx.test.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updatedData,
      });
      expect(result).toEqual({ ...testEntity, ...updatedData });
    });
  });

  describe('delete', () => {
    it('should delete an entity', async () => {
      const result = await repository.delete({ id: '1' });

      expect(mockTxHost.tx.test.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(testEntity);
    });
  });
});
