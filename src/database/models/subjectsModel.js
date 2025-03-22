const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");

const SubjectSchema = new Schema(
  {
    id: {
      type: String,
      immutable: true,
      // Random Unique Identifier
      default: () => randomUUID(),
    },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
);

const Subjects = model("Subjects", SubjectSchema);

module.exports = Subjects;
