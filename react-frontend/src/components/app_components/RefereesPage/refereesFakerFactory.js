
import { faker } from "@faker-js/faker";
export default (user,count,applicantIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicant: applicantIds[i % applicantIds.length],
refereeName: faker.lorem.sentence(1),
refereePosition: faker.lorem.sentence(1),
companyNameAndAddress: faker.lorem.sentence(1),
refereeCompanyPostalCode: faker.lorem.sentence(1),
refereeCompanyState: faker.lorem.sentence(1),
refereeContactNoHome: faker.lorem.sentence(1),
refereeContactNoMobile: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
