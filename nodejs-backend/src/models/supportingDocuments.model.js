
    module.exports = function (app) {
        const modelName = 'supporting_documents';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicant: { type: Schema.Types.ObjectId, ref: "applicant_details" ,  comment: "Applicant, dropdown" },
passportPhoto: { type:  [Schema.Types.ObjectId], ref: "document_storages" , required: true ,  comment: "Passport Photo, file_upload" },
passport: { type:  [Schema.Types.ObjectId], ref: "document_storages" , maxLength: 150, index: true, trim: true ,  comment: "Passport, file_upload" },
healthDeclarationForm: { type:  [Schema.Types.ObjectId], ref: "document_storages" , required: true ,  comment: "Health Declaration Form, file_upload" },
 ,  comment: "Education Level, dropdownArray" },
qualification: { type:  String , required: true ,  comment: "Qualification, p" },
schoolInstitute: { type:  String , required: true ,  comment: "School/Institute, p" },
academicDocuments: { type:  [Schema.Types.ObjectId], ref: "document_storages" , required: true ,  comment: "Academic Documents, file_upload" },

            
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