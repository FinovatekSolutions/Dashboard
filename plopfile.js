module.exports = function (plop) {
  plop.setGenerator('crud', {
    description: 'Create CRUD operation files for a model',
    prompts: [
      {
        type: 'input',
        name: 'singular',
        message: 'What is the singular name of your model (e.g., document)?',
      },
      {
        type: 'input',
        name: 'plural',
        message: 'What is the plural name of your model (e.g., documents)?',
      },
      {
        type: 'list',
        name: 'routeGroup',
        message: 'Which route group should this belong to?',
        choices: ['home', 'admin'], // Add more options as necessary
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'lib/actions/{{camelCase singular}}Actions.js',
        templateFile: 'plop-templates/Component.hbs',
      },
    ],
  });
};
