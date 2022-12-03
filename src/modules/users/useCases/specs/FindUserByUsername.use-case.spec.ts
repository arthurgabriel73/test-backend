import { IUsersRepository } from '../../IUsersRepository';
import { InMemoryUsersRepository } from './inMemory/InMemoryUsersRepository';
import { UserUseCasesSpecExecuter } from './UserUseCases-spec.executer';

let inMemoryUserRepository: IUsersRepository;

describe('Find User By Username', () => {
  const findUserExecuter = new UserUseCasesSpecExecuter();

  beforeEach(() => {
    findUserExecuter.resetDataCache();
    inMemoryUserRepository = new InMemoryUsersRepository();
  });

  it('should be able to find an user by his username', async () => {
    // Arrange
    await findUserExecuter.generateUser();
    await findUserExecuter.createNewUser();

    // Act
    await findUserExecuter.findUserByUsername();

    // Assert
    await findUserExecuter.assertResponseIsUser();
  });

  it('should throw a not found error when user from username does not exist', async () => {
    // Arrange & Act
    await findUserExecuter.generateUser();
    await findUserExecuter.findUserByUsername();

    // Assert
    await findUserExecuter.assertResponseIsUserNotFound();
  });
});
