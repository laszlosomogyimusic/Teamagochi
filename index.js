const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const managerQuestions = require("./src/questions/managerQuestions");
const engineerQuestions = require("./src/questions/engineerQuestions");
const internQuestions = require("./src/questions/internQuestions");
const mainMenuQuestions = require("./src/questions/mainMenuQuestions");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let employees = [];

const getManagerAnswers = () => {
  inquirer.prompt(managerQuestions).then((answers) => {
    let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(manager);
    getMainMenu();
  });
}

const getEngineerAnswers = () => {
  inquirer.prompt(engineerQuestions).then((answers) => {
    let engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
    employees.push(engineer);
    getMainMenu();
  });
}

const getInternAnswers = () => {
  inquirer.prompt(internQuestions).then((answers) => {
    let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(intern);
    getMainMenu();
  });
}

const getMainMenu = () => {
  inquirer.prompt(mainMenuQuestions).then((answers) => {
    switch(answers.main_menu) {
      case "Add an intern":
        getInternAnswers();
        break;
      case "Add an engineer":
        getEngineerAnswers();
        break;
      case "Finish building the team":
        createHtml();
        break;
    }

  });
}

const createHtml = () => {
  let renderedHtml = render(employees);
  fs.writeFile(outputPath, renderedHtml, (err) =>
  err ? console.log(err) : console.log('Success!'));

}

getManagerAnswers();
