
import { faker } from "@faker-js/faker";
export default (user,count,applicantIds,campusIds,locationIds,programmeLevelIds,programmeIds,intakeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicant: applicantIds[i % applicantIds.length],
acknowledgementConsent: faker.lorem.sentence(1),
applicationDate: faker.lorem.sentence(1),
campus: campusIds[i % campusIds.length],
location: locationIds[i % locationIds.length],
programmeLevel: programmeLevelIds[i % programmeLevelIds.length],
programme: programmeIds[i % programmeIds.length],
intake: intakeIds[i % intakeIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
