const { config } = require("dotenv");
const request = require("supertest");
const app = require("../app");
const { faker } = require("@faker-js/faker");

config({ path: "./.env" });

const requestToAPI = request(app);

function generateFakeUser() {
  const name = faker.person.firstName();

  const rol = faker.helpers.arrayElements(
    ["Cliente", "Administrador"],
    faker.number.int({ min: 1, max: Math.min(1) })
  )[0];

  return {
    name,
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    rol,
  };
}

let token;

// beforeAll(async () => {
//   const loginResponse = await requestToAPI
//     .post("/auth/login")
//     .send({ email: "adm@electrans.cl", password: "password" });
//   ({ token } = loginResponse.body);
// });

describe("Creación de usuarios", () => {
  test("Creación de usuario exitosa", async () => {
    const user = generateFakeUser();
    const response = await requestToAPI.post("/users").send(user);

    console.log({ response: response.body });

    expect(response.statusCode).toBe(201);
    
    const { body } = response;
    expect(body.name).toBe(user.name);
    expect(body.email).toBe(user.email);
  });
});
