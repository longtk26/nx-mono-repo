import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { User } from './models/user.model';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  // Mock user data
  const mockUser: User = {
    id: 'uuid',
    email: 'test@example.com',
  };

  const mockUsers: User[] = [mockUser];

  // Mock create user DTO
  const createUserDto: CreateUserRequestDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    // Create a testing module with mocked UsersService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            getUsers: jest.fn().mockResolvedValue(mockUsers),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Call the resolver method
      const result = await resolver.createUser(createUserDto);

      // Verify service was called with the right parameters
      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);

      // Verify the result
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user creation fails', async () => {
      // Setup the service to throw an error
      jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValueOnce(new Error('Failed to create user'));

      // Expect the resolver to throw the same error
      await expect(resolver.createUser(createUserDto)).rejects.toThrow(
        'Failed to create user'
      );
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      // Call the resolver method
      const result = await resolver.getUsers();

      // Verify service was called
      expect(usersService.getUsers).toHaveBeenCalled();

      // Verify the result
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if fetching users fails', async () => {
      // Setup the service to throw an error
      jest
        .spyOn(usersService, 'getUsers')
        .mockRejectedValueOnce(new Error('Failed to fetch users'));

      // Expect the resolver to throw the same error
      await expect(resolver.getUsers()).rejects.toThrow(
        'Failed to fetch users'
      );
    });
  });
});
