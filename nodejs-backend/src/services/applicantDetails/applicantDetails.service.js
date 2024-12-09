const { ApplicantDetails } = require('./applicantDetails.class');
const createModel = require('../../models/applicantDetails.model');
const hooks = require('./applicantDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/applicantDetails', new ApplicantDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('applicantDetails');

  // Get the schema of the collections 
  app.get("/applicantDetailsSchema", function (request, response) {
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