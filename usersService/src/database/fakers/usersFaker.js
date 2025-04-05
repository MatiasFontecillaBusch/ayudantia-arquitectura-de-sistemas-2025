const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

async function generateFakeUser() {
  const name = faker.person.firstName();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(name, salt);

  const rol = faker.helpers.arrayElements(
    ["Cliente", "Administrador"],
    faker.number.int({ min: 1, max: Math.min(1) })
  )[0];

  return {
    name,
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    // password: hashedPassword,
    // passwordSalt: salt,
    rol,
  };
}

module.exports = generateFakeUser;
