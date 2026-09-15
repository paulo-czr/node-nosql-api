const bcrypt = require('bcrypt');
const hashSenhaHook = require('../hook/hashSenha');

jest.mock('bcrypt');

describe('hashSenhaHook', () => {
  let mockContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve interromper o fluxo se a senha não tiver sido modificada', async () => {
    mockContext = {
      isModified: jest.fn().mockReturnValue(false),
      senha: 'minhaSenha123',
    };

    await expect(hashSenhaHook.call(mockContext)).resolves.toBeUndefined();

    expect(mockContext.isModified).toHaveBeenCalledWith('senha');
    expect(bcrypt.genSalt).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('deve gerar o hash da senha corretamente quando a senha for modificada', async () => {
    mockContext = {
      isModified: jest.fn().mockReturnValue(true),
      senha: 'senhaSegura123',
    };

    bcrypt.genSalt.mockResolvedValue('saltFake123');
    bcrypt.hash.mockResolvedValue('senhaHashFake123');

    await expect(hashSenhaHook.call(mockContext)).resolves.toBeUndefined();

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('senhaSegura123', 'saltFake123');
    expect(mockContext.senha).toBe('senhaHashFake123');
  });

  it('deve lançar um erro caso ocorra falha no bcrypt', async () => {
    mockContext = {
      isModified: jest.fn().mockReturnValue(true),
      senha: 'senhaSegura123',
    };

    const erroSimulado = new Error('Erro ao gerar salt');
    bcrypt.genSalt.mockRejectedValue(erroSimulado);

    await expect(hashSenhaHook.call(mockContext)).rejects.toThrow(
      'Falha ao processar a criptografia da senha.'
    );

    expect(mockContext.senha).toBe('senhaSegura123');
  });
});