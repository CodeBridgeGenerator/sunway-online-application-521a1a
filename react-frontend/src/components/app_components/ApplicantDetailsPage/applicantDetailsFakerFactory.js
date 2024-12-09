
import { faker } from "@faker-js/faker";
export default (user,count,studentUserIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
studentUser: studentUserIds[i % studentUserIds.length],
fullName: faker.lorem.sentence(1),
firstName: faker.lorem.sentence(1),
surname: faker.lorem.sentence(1),
nationality: faker.lorem.sentence(1),
passportNumber: faker.lorem.sentence(1),
passportExpiryDate: faker.lorem.sentence(1),
dateOfBirth: faker.lorem.sentence(1),
isSpecialConditions: faker.lorem.sentence(1),
isFormerStudent: faker.lorem.sentence(1),
studentId: faker.lorem.sentence(1),
isHoldValidMalaysianVisa: faker.lorem.sentence(1),
studentPassExpiryDate: faker.lorem.sentence(1),
institutionEnrolled: faker.lorem.sentence(1),
malaysianEmbassyCity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
