// imports
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const genMD = require("./utils/generateMarkdown.js");

// variables, objects
const questions = [
  {
    message: "Title: ",
    name: "title"
  },
  {
    message: "Description: ",
    name: "description"
  }
];
const writeFileAsync = util.promisify(fs.writeFile);

function writeToFile(fileName, data) {
  const markdownRaw = genMD(data);

  writeFileAsync(fileName,markdownRaw);
}

async function init() {
  let data = await inquirer.prompt(questions);
  await writeToFile("README.md",data);
}

init();
