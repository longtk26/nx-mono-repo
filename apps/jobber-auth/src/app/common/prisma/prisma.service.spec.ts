import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { Logger } from '@nestjs/common';

describe('PrismaService', () => {
  let service: PrismaService;
  let connectSpy: jest.SpyInstance;
  let disconnectSpy: jest.SpyInstance;
  let loggerLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Create testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    // Mock the PrismaClient methods
    connectSpy = jest.spyOn(service, '$connect').mockResolvedValue(undefined);
    disconnectSpy = jest
      .spyOn(service, '$disconnect')
      .mockResolvedValue(undefined);

    // Mock the logger
    loggerLogSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to the database and log a message', async () => {
      // Execute the method
      await service.onModuleInit();

      // Verify the connection was established
      expect(connectSpy).toHaveBeenCalledTimes(1);
      expect(loggerLogSpy).toHaveBeenCalledWith(
        'PrismaService connected to the database'
      );
    });
  });

  describe('onModuleDestroy', () => {
    it('should disconnect from the database and log a message', async () => {
      // Execute the method
      await service.onModuleDestroy();

      // Verify the disconnection was performed
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
      expect(loggerLogSpy).toHaveBeenCalledWith(
        'PrismaService disconnected from the database'
      );
    });
  });
});
