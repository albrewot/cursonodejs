const pow = require("../functions/pow");
const sum = require("../functions/sum");
const assert = require("chai").assert;

describe("testeos de potencia", () => {
  describe("elevado a la potencia", () => {
    it("2 elevado a la 3 deberia dar 8", () => {
      assert.equal(pow(2, 3), 8);
    });
    it("3 elevado a la 3 deberia dar 27", () => {
      assert.equal(pow(3, 3), 27, "deberia dar 27");
    });
    // it("")
    // assert.isNaN()
  });

  describe("a la potencia de 3", () => {
    function hacerPrueba(x) {
      let esperado = x * x * x;
      it(`${x} en potencia de 3 es: ${esperado}`, () => {
        assert.equal(pow(x, 3), esperado);
      });
    }
    for (let x = 1; x <= 5; x++) {
      hacerPrueba(x);
    }
  });
});

describe("Suma de dos numeros", () => {
  it("2 mas 2 deberia dar 4", () => {
    assert.equal(sum(2, 2), 4, "deberia dar 4");
  });
});

describe("testeo", () => {
  before(() => {
    console.log("Antes de todos los tests");
  });
  after(() => {
    console.log("Luego de todos los tests");
  });
  afterEach(() => {
    console.log("Luego de cada test");
  });
  beforeEach(() => {
    console.log("antes de cada test");
  });

  it("Deberia imprimir algo 1", () => {
    assert.isTrue(true, true);
  });

  it("Deberia imprimir algo 2", () => {
    assert.isTrue(true, true);
  });

  it("Deberia imprimir algo 3", () => {
    assert.isTrue(true, true);
  });

  it("Deberia imprimir algo 4", () => {
    assert.isTrue(true, true);
  });
});
