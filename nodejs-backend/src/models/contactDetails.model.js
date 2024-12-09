
    module.exports = function (app) {
        const modelName = 'contact_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicant: { type: Schema.Types.ObjectId, ref: "applicant_details" ,  comment: "Applicant, dropdown" },
fullCorrespondenceAddress: { type:  String , required: true ,  comment: "Full Correspondence Address, p" },
correspondenceCityTown: { type:  String , required: true ,  comment: "City/Town, p" },
correspondencePostalCode: { type:  String , required: true ,  comment: "Postal Code, p" },
 ,  comment: "Country, dropdownArray" },
studentMobileNumber: { type:  String , required: true ,  comment: "Student's Mobile Number, p" },
correspondenceHomeContactNo: { type:  String , required: true ,  comment: "Home Contact Number, p" },
studentEmail: { type:  String , required: true ,  comment: "Student's Email, p" },
isSameAsCorrespondenceAddress: { type: Boolean, required: false ,  comment: "IsSameAsCorrespondence Address, checkbox" },
fullPermanentAddress: { type:  String , required: true ,  comment: "Full Permanent Address, p" },
permanentCityTown: { type:  String , required: true ,  comment: "City/Town, p" },
permanentPostalCode: { type:  String , required: true ,  comment: "Postal Code, p" },
 ,  comment: "State/Province, dropdownArray" },
 ,  comment: "Country, dropdownArray" },
permanentContactNo: { type:  String , required: true ,  comment: "Home/Mobile Contact Number, p" },
parentName: { type:  String , required: true ,  comment: "Name (as per NRIC/Passport), p" },
 ,  comment: "Relationship, dropdownArray" },
parentMobileNo: { type:  String , required: true ,  comment: "Mobile No, p" },
parentHomeNo: { type:  String , required: true ,  comment: "Home No, p" },
parentEmail: { type:  String , required: true ,  comment: "Email, p" },
parentOfficeNo: { type:  String , required: true ,  comment: "OfficeNo, p" },
 ,  comment: "Monthly Houshold Income, dropdownArray" },
emergencyName: { type:  String , required: true ,  comment: "Name, p" },
 ,  comment: "Relationship, dropdownArray" },
emergencyMobileNo: { type:  String , required: true ,  comment: "Mobile No, p" },
emergencyHomeNo: { type:  String , required: true ,  comment: "Home No, p" },
emergencyEmail: { type:  String , required: true ,  comment: "Email, p" },
emergencyOfficeNo: { type:  String , required: true ,  comment: "Office No, p" },

            
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