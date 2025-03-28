const { faker } = require("@faker-js/faker");

function generateFakeSubject() {
  return {
    name: faker.lorem.words(2), // Genera un nombre compuesto por dos palabras
  };
}

module.exports = generateFakeSubject;
