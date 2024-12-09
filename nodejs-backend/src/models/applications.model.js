
    module.exports = function (app) {
        const modelName = 'applications';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicant: { type: Schema.Types.ObjectId, ref: "applicants" ,  comment: "Applicant, dropdown" },
programme: { type: Schema.Types.ObjectId ,  comment: "Programme, dropdown" },
acknowledgementConsent: { type: Boolean, required: false ,  comment: "Acknowledgement Consent, checkbox" },
applicationDate: { type: Date, required: false ,  comment: "Application Date, p_calendar" },
 ,  comment: "Status, dropdownArray" },
campus: { type: Schema.Types.ObjectId, ref: "programmes" ,  comment: "Campus, dropdown" },
location: { type: Schema.Types.ObjectId, ref: "programmes" ,  comment: "Location, dropdown" },
programmeLevel: { type: Schema.Types.ObjectId, ref: "programmes" ,  comment: "Programme Level, dropdown" },
programme: { type: Schema.Types.ObjectId, ref: "programmes" ,  comment: "Programme, dropdown" },
intake: { type: Schema.Types.ObjectId, ref: "programmes" ,  comment: "Intake, dropdown" },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };