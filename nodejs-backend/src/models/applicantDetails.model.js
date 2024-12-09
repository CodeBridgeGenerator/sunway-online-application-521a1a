
    module.exports = function (app) {
        const modelName = 'applicant_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            studentUser: { type: Schema.Types.ObjectId, ref: "studentUser" ,  comment: "Student User, dropdown" },
fullName: { type:  String , required: true ,  comment: "Full Name, p" },
firstName: { type:  String , required: true ,  comment: "First Name, p" },
surname: { type:  String , required: true ,  comment: "Surname, p" },
nationality: { type:  String , required: true ,  comment: "Nationality, p" },
passportNumber: { type:  String , required: true ,  comment: "Passport Number, p" },
passportExpiryDate: { type: Date, required: false ,  comment: "Passport Expiry Date, p_calendar" },
dateOfBirth: { type: Date, required: false ,  comment: "Date Of Birth, p_calendar" },
 ,  comment: "Gender, dropdownArray" },
 ,  comment: "Marital Status, dropdownArray" },
 ,  comment: "Religion, dropdownArray" },
isSpecialConditions: { type: Boolean, required: false ,  comment: "Is Special Conditions, checkbox" },
 ,  comment: "Special Condtions, dropdownArray" },
isFormerStudent: { type: Boolean, required: false ,  comment: "Is Former Student, checkbox" },
studentId: { type:  String , required: true ,  comment: "Student Id, p" },
isHoldValidMalaysianVisa: { type: Boolean, required: false ,  comment: "Is Hold Valid Malaysian Visa, checkbox" },
 ,  comment: "Immigration Pass Type, dropdownArray" },
studentPassExpiryDate: { type: Date, required: false ,  comment: "Student Pass Expiry Date, p_calendar" },
institutionEnrolled: { type:  String , required: true ,  comment: "Institution Enrolled, p" },
malaysianEmbassyCity: { type:  String , required: true ,  comment: "City, p" },
 ,  comment: "Country, dropdownArray" },

            
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