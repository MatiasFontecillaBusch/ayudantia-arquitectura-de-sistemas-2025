const Users = require("../../database/models/usersModel");
const getChannel = require("../config/connection");

const userCreate = async () => {
  const channel = await getChannel();

  channel.consume("user-create-queue2", async (data) => {
    const content = JSON.parse(data.content);
    console.log("user-create-queue2");
    console.log(content);

    try {
      await Users.create(content);
      // Para que el mensaje no sea leido infinitamente
      channel.ack(data);
    } catch (error) {
      console.error("Failed to create user:", error);
      channel.nack(data, false, true);
    }
  });
};

module.exports = userCreate;
