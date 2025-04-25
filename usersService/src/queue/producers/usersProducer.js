const getChannel = require("../config/connection");

const EXCHANGE_NAME = "user-create-exchange";

const userCreationEvent = async (createdUser) => {
  const channel = await getChannel();
  const msgBuffer = Buffer.from(JSON.stringify(createdUser));

  channel.publish(EXCHANGE_NAME, "", msgBuffer, { persistent: true });
};

module.exports = userCreationEvent;
