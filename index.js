const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

let managerQuestions = require("./src/questions/managerQuestions");
const engineerQuestions = require("./src/questions/engineerQuestions");
const internQuestions = require("./src/questions/internQuestions");
const mainMenuQuestions = require("./src/questions/mainMenuQuestions");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let employees = [];

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


const getManagerAnswers = () => {
  console.log(managerQuestions);
  inquirer.prompt(managerQuestions).then((answers) => {
    let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(manager);
    console.log(employees);
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

console.log("AA");
getManagerAnswers();

// getManagerAnswers()
//   .then(console.log)
//   .catch((error) => {});

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