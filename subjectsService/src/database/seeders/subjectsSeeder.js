const fs = require("fs");
const path = require("path");
const generateFakeSubject = require("../fakers/subjectsFaker");
const Subjects = require("../models/subjectsModel");

async function seedSubjectsFaker(numSubjects = 10) {
  const subjectsData = [];
  for (let i = 0; i < numSubjects; i++) {
    subjectsData.push(generateFakeSubject());
  }
  const subjects = await Subjects.insertMany(subjectsData);
  return subjects;
}

async function seedSubjectsMock() {
  const filePath = path.join(__dirname, "../mock/mockSubjects.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const subjectsMock = JSON.parse(data);

  const subjectsData = subjectsMock.map((subject) => ({
    name: subject.name,
    createdAt: subject.createdAt,
  }));

  const subjects = await Subjects.insertMany(subjectsData);
  return subjects;
}

module.exports = {
  seedSubjectsFaker,
  seedSubjectsMock,
};
