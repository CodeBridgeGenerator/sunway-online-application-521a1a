
import { faker } from "@faker-js/faker";
export default (user,count,applicantIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicant: applicantIds[i % applicantIds.length],
fullCorrespondenceAddress: faker.lorem.sentence(1),
correspondenceCityTown: faker.lorem.sentence(1),
correspondencePostalCode: faker.lorem.sentence(1),
studentMobileNumber: faker.lorem.sentence(1),
correspondenceHomeContactNo: faker.lorem.sentence(1),
studentEmail: faker.lorem.sentence(1),
isSameAsCorrespondenceAddress: faker.lorem.sentence(1),
fullPermanentAddress: faker.lorem.sentence(1),
permanentCityTown: faker.lorem.sentence(1),
permanentPostalCode: faker.lorem.sentence(1),
permanentContactNo: faker.lorem.sentence(1),
parentName: faker.lorem.sentence(1),
parentMobileNo: faker.lorem.sentence(1),
parentHomeNo: faker.lorem.sentence(1),
parentEmail: faker.lorem.sentence(1),
parentOfficeNo: faker.lorem.sentence(1),
emergencyName: faker.lorem.sentence(1),
emergencyMobileNo: faker.lorem.sentence(1),
emergencyHomeNo: faker.lorem.sentence(1),
emergencyEmail: faker.lorem.sentence(1),
emergencyOfficeNo: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
