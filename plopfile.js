module.exports = function (plop) {
  // Helper to add curly braces around content
  //example:
  /*
  You can use it like
  {{#bracket 2}}styles.{{name}}{{/bracket}}
  it will give
  {{styles.Name}}
  */
  plop.setHelper('bracket', function (num, options) {
    const i = Number.isInteger(num) ? num : 1;
    const open = '{'.repeat(i);
    const close = '}'.repeat(i);
    return `${open}${options.fn(this)}${close}`;
  });

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
        path: 'lib/actions/{{camelCase singular}}/{{camelCase singular}}.action.ts',
        templateFile: 'plop-templates/model/actions/model.action.ts.hbs',
      },
      {
        type: 'add',
        path: 'lib/actions/{{camelCase singular}}/{{camelCase singular}}.hook.ts',
        templateFile: 'plop-templates/model/actions/model.hook.ts.hbs',
      },
      {
        type: 'add',
        path: 'lib/actions/{{camelCase singular}}/index.ts',
        templateFile: 'plop-templates/model/actions/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/crud/Delete{{pascalCase singular}}Button/Delete{{pascalCase singular}}Button.tsx',
        templateFile: 'plop-templates/model/crud/DeleteModelButton.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/crud/Delete{{pascalCase singular}}Form/Delete{{pascalCase singular}}Form.tsx',
        templateFile: 'plop-templates/model/crud/DeleteModelForm.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/crud/Edit{{pascalCase singular}}Button/Edit{{pascalCase singular}}Button.tsx',
        templateFile: 'plop-templates/model/crud/EditModelButton.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/crud/Edit{{pascalCase singular}}Form/Edit{{pascalCase singular}}Form.tsx',
        templateFile: 'plop-templates/model/crud/EditModelForm.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/crud/New{{pascalCase singular}}Button/New{{pascalCase singular}}Button.tsx',
        templateFile: 'plop-templates/model/crud/NewModelButton.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/crud/New{{pascalCase singular}}Form/New{{pascalCase singular}}Form.tsx',
        templateFile: 'plop-templates/model/crud/NewModelForm.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{camelCase singular}}/general/{{pascalCase plural}}Table/{{pascalCase plural}}Table.tsx',
        templateFile: 'plop-templates/model/general/ModelsTable.tsx.hbs',
      },
      {
        type: 'add',
        path: 'app/({{camelCase routeGroup}})/{{camelCase plural}}/page.tsx',
        templateFile: 'plop-templates/model/page/page.tsx.hbs',
      },
      {
        type: 'add',
        path: 'app/({{camelCase routeGroup}})/{{camelCase plural}}/page.client.tsx',
        templateFile: 'plop-templates/model/page/page.client.tsx.hbs',
      },
    ],
  });
};
