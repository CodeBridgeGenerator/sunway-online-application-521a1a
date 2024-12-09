
    module.exports = function (app) {
        const modelName = 'referees';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicant: { type: Schema.Types.ObjectId, ref: "applicant_details" ,  comment: "Applicant, dropdown" },
refereeName: { type:  String , required: true ,  comment: "Referee Name, p" },
refereePosition: { type:  String , required: true ,  comment: "Referee Position, p" },
companyNameAndAddress: { type:  String , required: true ,  comment: "Company Name And Address, p" },
refereeCompanyPostalCode: { type:  String , required: true ,  comment: "Referee Company Postal Code, p" },
refereeCompanyState: { type:  String , required: true ,  comment: "Referee Company State, p" },
 ,  comment: "Referee Company Country, dropdownArray" },
refereeContactNoHome: { type:  String , required: true ,  comment: "Referee Contact Number Home, p" },
refereeContactNoMobile: { type:  String , required: true ,  comment: "Referee Contact Number Mobile, p" },

            
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