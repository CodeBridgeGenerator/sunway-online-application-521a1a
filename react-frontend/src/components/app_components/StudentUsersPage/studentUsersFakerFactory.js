
import { faker } from "@faker-js/faker";
export default (user,count,userIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
passport: faker.lorem.sentence(1),
mobileNumber: faker.lorem.sentence(1),
dateOfBirth: faker.lorem.sentence(1),
user: userIds[i % userIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
