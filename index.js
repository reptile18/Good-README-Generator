// imports
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");
const genMD = require("./utils/generateMarkdown.js");

// variables, objects
const questions = [
  {
    message: "Github username: ",
    name: "username"
  },
  {
    message: "Github email: ",
    name: "email"
  },
  {
    message: "Title: ",
    name: "title"
  },
  {
    message: "Version: ",
    name: "version"
  },
  {

    message: "Description: ",
    name: "description"
  },
  {

    message: "Installation notes: ",
    name: "installation"
  },
  {
    message: "Usage: ",
    name: "usage"
  },
  {
    type: "list",
    message: "License",
    name: "license",
    choices: ["Apache License 2.0","GNU General Public License v3.0","MIT License","Blank"]
  },
  {
    message: "Enter a list of collaborators separated by |, name and GitHub username separated by ~ (ex. John Smith~jsmith|Jane Smith~jsmith2): ",
    name: "contributing"
  },
  {
    message: "Tests: ",
    name: "tests"
  }

];
const writeFileAsync = util.promisify(fs.writeFile);

async function getGitUser(username) {
  const queryUrl = `https://api.github.com/users/${username}`;

  const gitUserData = await axios.get(queryUrl);
  const {avatar_url,email} = gitUserData.data;

  return {"avatar_url": avatar_url}//, "email": email}; // email doesn't work yet until I get authentication
}

function processContributors(data) { 
  let contributorsMarkdown = "";
  data.contributing.split("|").forEach((userString) => {
    const userPieces = userString.split("~");

    contributorsMarkdown += `* [${userPieces[0]}](https://github.com/${userPieces[1]})  
`
  });
  return contributorsMarkdown;
}

function writeToFile(fileName, data) {
  const markdownRaw = genMD(data);

  writeFileAsync(fileName,markdownRaw);
}

async function init() {
  let data = await inquirer.prompt(questions);
  const gitUserData = await getGitUser(data.username);
  data = {...data,...gitUserData} 
  const contributors = await processContributors(data);
  data = {...data,...{"contributors": contributors}};
  await writeToFile("Generated.README.md",data);
  console.log("Generated.README.md generated.")
}

init();
