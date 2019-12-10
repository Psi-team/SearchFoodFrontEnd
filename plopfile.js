module.exports = function(plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'React component generator',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'component name please',
      },
      {
        type: 'input',
        name: 'path',
        message: 'absolute path please under src folder',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{path}}/{{componentName}}/{{componentName}}.js',
        templateFile: 'templates/BasicComponent/BasicComponent.js.hbs',
      },
      {
        type: 'add',
        path: 'src/{{path}}/{{componentName}}/{{componentName}}.test.js',
        templateFile: 'templates/BasicComponent/BasicComponent.test.js.hbs',
      },
      {
        type: 'add',
        path: 'src/{{path}}/{{componentName}}/index.js',
        templateFile: 'templates/export.js.hbs',
      },
    ],
  });
};
