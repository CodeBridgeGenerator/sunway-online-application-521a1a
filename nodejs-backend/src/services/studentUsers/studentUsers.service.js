const { StudentUsers } = require('./studentUsers.class');
const createModel = require('../../models/studentUsers.model');
const hooks = require('./studentUsers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/studentUsers', new StudentUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('studentUsers');

  // Get the schema of the collections 
  app.get("/studentUsersSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        ...schema[key]
      };
    }).filter((item) => item);
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};