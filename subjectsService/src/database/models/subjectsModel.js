const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");

const SubjectSchema = new Schema({
  id: {
    type: String,
    immutable: true,
    // Random Unique Identifier
    default: () => randomUUID(),
  },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, ref: "Users", required: true },
  deletedAt: { type: Date, default: null },
});

SubjectSchema.virtual("creator", {
  ref: "Users",
  localField: "createdBy",
  foreignField: "id",
  justOne: true,
});

const Subjects = model("Subjects", SubjectSchema);

module.exports = Subjects;
