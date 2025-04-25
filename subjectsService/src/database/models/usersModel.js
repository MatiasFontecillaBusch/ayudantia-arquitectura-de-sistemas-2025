const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  id: {
    type: String,
    immutable: true,
    // Random Unique Identifier
    default: () => randomUUID(),
  },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const Users = model("Users", UsersSchema);

module.exports = Users;
