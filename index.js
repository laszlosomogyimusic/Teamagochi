const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const questions = [
  {
    type: "number",
    name: "children_count",
    message: "How many children do you have?",
  },
  {
    type: "input",
    name: "first_child_name",
    message: "What is the eldest child's name?",
  },
  {
    type: "confirm",
    name: "is_finished",
    message: "Are you done?",
  },
];

const managerQuestions = [
  {
    type: "input",
    name: "manager_name",
    message: "What is the team manager's name?",
  },
  {
    type: "list",
    message: "What do you want to do next?",
    name: "main_menu",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },  
];

const engineerQuestions = [
  {
    type: "input",
    name: "engineer_name",
    message: "What is the engineer name?",
  },
  {
    type: "list",
    message: "What do you want to do next?",
    name: "main_menu",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },  
];

const internQuestions = [
  {
    type: "input",
    name: "intern_name",
    message: "What is the intern name?",
  },
  {
    type: "list",
    message: "What do you want to do next?",
    name: "main_menu",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },  
];



const getManagerAnswers = () => {
  return inquirer.prompt(managerQuestions).then((answers) => {
    switch(answers.main_menu) {
      case "Add an intern":
        return getInternAnswers();
        break;
      case "Add an engineer":
        return getEngineerAnswers();
        break;
      case "Finish building the team":
        return answers;
        break;
    }

    // if (answers.main_menu === "Finish building the team") {
    //   return answers;
    // } else {
    //   return getAnswers();
    // }
  });
}

const getEngineerAnswers = () => {
  return inquirer.prompt(engineerQuestions).then((answers) => {
    switch(answers.main_menu) {
      case "Add an intern":
        return getInternAnswers();
        break;
      case "Add an engineer":
        return getEngineerAnswers();
        break;
      case "Finish building the team":
        return answers;
        break;
    }
  });
}

const getInternAnswers = () => {
  return inquirer.prompt(internQuestions).then((answers) => {
    switch(answers.main_menu) {
      case "Add an intern":
        return getInternAnswers();
        break;
      case "Add an engineer":
        return getEngineerAnswers();
        break;
      case "Finish building the team":
        return answers;
        break;
    }
  });
}



getManagerAnswers()
  .then(console.log)
  .catch((error) => {});

const getAnswers = () => {
  return inquirer.prompt(questions).then((answers) => {
    if (answers.is_finished) {
      return answers;
    } else {
      return getAnswers();
    }
  });
}

// getAnswers()
//   .then(console.log)
//   .catch((error) => {});