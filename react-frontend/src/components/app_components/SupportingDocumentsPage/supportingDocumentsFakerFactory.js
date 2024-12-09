
import { faker } from "@faker-js/faker";
export default (user,count,applicantIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicant: applicantIds[i % applicantIds.length],
passportPhoto: faker.lorem.sentence(""),
passport: faker.lorem.sentence("8"),
healthDeclarationForm: faker.lorem.sentence(""),
educationLevel: faker.lorem.sentence(""),
qualification: faker.lorem.sentence(""),
schoolInstitute: faker.lorem.sentence(""),
academicDocuments: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
