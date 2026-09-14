const bcrypt = require('bcrypt');
const hashSenhaHook = require('../hook/hashSenha');

jest.mock('bcrypt');

describe('hashSenhaHook', () => {
  let mockContext;
  let mockNext;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNext = jest.fn();
  });

  it('deve interromper o fluxo se a senha não tiver sido modificada', async () => {
    mockContext = {
      isModified: jest.fn().mockReturnValue(false),
      senha: 'minhaSenha123',
    };

    await hashSenhaHook.call(mockContext, mockNext);

    expect(mockContext.isModified).toHaveBeenCalledWith('senha');
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(); // chamado sem erro
    expect(bcrypt.genSalt).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('deve gerar o hash da senha corretamente quando a senha for modificada', async () => {
    mockContext = {
      isModified: jest.fn().mockReturnValue(true),
      senha: 'senhaSegura123',
    };

    // Retorno esperado dos mocks
    bcrypt.genSalt.mockResolvedValue('saltFake123');
    bcrypt.hash.mockResolvedValue('senhaHashFake123');

    await hashSenhaHook.call(mockContext, mockNext);

    expect(mockContext.isModified).toHaveBeenCalledWith('senha');
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('senhaSegura123', 'saltFake123');
    expect(mockContext.senha).toBe('senhaHashFake123');
    expect(mockNext).toHaveBeenCalledWith();
  });

  it('deve repassar o erro para a função next caso ocorra falha no bcrypt', async () => {
    mockContext = {
      isModified: jest.fn().mockReturnValue(true),
      senha: 'senhaSegura123',
    };

    const erroSimulado = new Error('Erro ao gerar salt');
    bcrypt.genSalt.mockRejectedValue(erroSimulado);

    await hashSenhaHook.call(mockContext, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
        new Error('Falha ao processar a criptografia da senha.')
    );
  });
});