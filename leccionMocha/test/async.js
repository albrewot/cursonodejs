const assert = require("chai").assert;
const asyncFunc = require("../functions/asyncFunc");

describe("Testeos asincronos", () => {
  context("Contexto del testeo", () => {
    it("deberia devolver 1", done => {
      asyncFunc(response => {
        assert.equal(response, 1, "esta llamada asincrona deberia dar 1");
        done();
      });
    });
  });
});

describe("testeo de promesas", () => {
  context("test con async await", () => {
    it("deberia retornar un objeto", async () => {
      const response = await new Promise(resolve => {
        resolve({ name: "albert" });
      });
      assert.isObject(response, "No es un Objeto");
    });
  });

  context("test retornando una promesa", () => {
    it("deberia retornar un numero", () => {
      const myPromise = new Promise(resolve => {
        resolve(365);
      });
      return myPromise.then(result => {
        assert.isNumber(result, "Resultado no es un numero");
      });
    });
  });

  context("test con promesa y finally", () => {
    it("deberia retornar un NaN", done => {
      const myPromise = new Promise(resolve => {
        resolve(NaN);
      });
      myPromise
        .then(result => {
          assert.isNaN(result, "Resultado no es NaN");
        })
        .finally(done);
    });
  });
});
