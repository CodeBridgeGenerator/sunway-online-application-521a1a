const { Programmes } = require('./programmes.class');
const createModel = require('../../models/programmes.model');
const hooks = require('./programmes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/programmes', new Programmes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('programmes');

  // Get the schema of the collections 
  app.get("/programmesSchema", function (request, response) {
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