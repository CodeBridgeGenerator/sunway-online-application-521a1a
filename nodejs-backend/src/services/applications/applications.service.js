const { Applications } = require('./applications.class');
const createModel = require('../../models/applications.model');
const hooks = require('./applications.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/applications', new Applications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('applications');

  // Get the schema of the collections 
  app.get("/applicationsSchema", function (request, response) {
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