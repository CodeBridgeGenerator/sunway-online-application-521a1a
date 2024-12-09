
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
campus: faker.lorem.sentence(1),
location: faker.lorem.sentence(1),
programmeLevel: faker.lorem.sentence(1),
programme: faker.lorem.sentence(1),
intake: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
