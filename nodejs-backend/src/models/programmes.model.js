
    module.exports = function (app) {
        const modelName = 'programmes';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            campus: { type:  String , maxLength: 150, index: true, trim: true ,  comment: "Campus, p" },
location: { type:  String , maxLength: 150, index: true, trim: true ,  comment: "Location, p" },
programmeLevel: { type:  String , maxLength: 150, index: true, trim: true ,  comment: "Programme Level, p" },
programme: { type:  String , maxLength: 150, index: true, trim: true ,  comment: "Programme, p" },
intake: { type: Date, required: false ,  comment: "Intake, p_calendar" },

            
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