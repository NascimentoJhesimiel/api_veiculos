# 🧪 Estrutura de Testes

Esta pasta contém todos os testes do projeto organizados seguindo as melhores práticas da comunidade Node.js.

## 📁 Organização

```
tests/
├── unit/                    # Testes unitários
│   └── controllers/         # Testes dos controllers
│       └── vehicle-controller.spec.js
└── integration/            # Testes de integração (futuro)
    └── api/
```

## 🎯 Tipos de Teste

### Unit Tests (`tests/unit/`)
- Testam componentes isolados
- Usam mocks para dependências
- Foco em lógica de negócio
- Execução rápida

### Integration Tests (`tests/integration/`) - Futuro
- Testam interação entre componentes
- Usam banco de dados de teste
- Testam APIs completas
- Simulam cenários reais


## 🏃‍♂️ Executando os Testes

```bash
# Todos os testes
npm test

# Com coverage
npm run test:coverage

# Watch mode (desenvolvimento)
npm run test:watch
```

## 📊 Coverage

O projeto está configurado para gerar relatórios de cobertura:

- **Text**: No terminal
- **LCOV**: Para IDEs (VSCode, WebStorm)
- **HTML**: Relatório visual em `coverage/`

## 🎨 Convenções

### Nomenclatura
- Arquivos: `*.spec.js` ou `*.test.js`
- Describe: Nome da função/classe testada
- Test: Deve começar com "Should..."

### Estrutura dos Testes
```javascript
describe("FunctionName", () => {
  beforeEach(() => {
    // Setup para cada teste
  });

  test("Should return success when...", async () => {
    // Arrange
    const input = {};
    
    // Act
    const result = await functionName(input);
    
    // Assert
    expect(result).toEqual(expected);
  });
});
```

## 🔄 Mocks com ES Modules

Para mocks com ES Modules, sempre seguir esta ordem:

1. **Mock ANTES** da importação
2. **Import dinâmico** com `await import()`
3. **Setup dos dados** de teste
4. **Execução** da função
5. **Assertions**

```javascript
// ✅ Correto
jest.unstable_mockModule("../path/to/module.js", () => ({
  ClassName: jest.fn().mockImplementation(() => ({
    method: mockMethod,
  }))
}));

const { functionToTest } = await import("../path/to/controller.js");