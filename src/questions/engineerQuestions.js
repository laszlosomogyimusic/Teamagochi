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

module.exports = engineerQuestions;