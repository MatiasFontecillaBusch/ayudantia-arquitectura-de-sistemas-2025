const generateFakeUser = require("../fakers/usersFaker");
const prisma = require("../prisma");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

async function seedUsersFaker(numUsers = 10) {
  const usersData = [];
  for (let i = 0; i < numUsers; i++) {
    usersData.push(await generateFakeUser());
  }
  const result = await prisma.users.createMany({
    data: usersData,
    skipDuplicates: true,
  });
  return result;
}

async function seedUsersMock() {
  const filePath = path.join(__dirname, "../mock/mockUsers.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const usersMock = JSON.parse(data);
  console.log(usersMock);

  const usersData = await Promise.all(
    usersMock.map(async (user) => {
      const plainPassword = user.name;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      return {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        rol: user.rol,
        createdAt: new Date(user.createdAt),
        deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
        // password: hashedPassword,
        // passwordSalt: salt,
      };
    })
  );

  const result = await prisma.users.createMany({
    data: usersData,
    skipDuplicates: true,
  });
  return result;
}

module.exports = { seedUsersFaker, seedUsersMock };
