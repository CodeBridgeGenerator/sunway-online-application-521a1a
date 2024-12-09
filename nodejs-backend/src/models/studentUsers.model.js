
    module.exports = function (app) {
        const modelName = 'student_users';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
             ,  comment: "Type, dropdownArray" },
 ,  comment: "Nationality, dropdownArray" },
passport: { type:  String , required: true ,  comment: "Passport, p" },
mobileNumber: { type:  String , maxLength: 150, index: true, trim: true ,  comment: "Mobile Number, p" },
 ,  comment: "Gender, dropdownArray" },
dateOfBirth: { type: Date, required: false ,  comment: "Date Of Birth, p_calendar" },
user: { type: Schema.Types.ObjectId, ref: "users" ,  comment: "User, dropdown" },

            
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