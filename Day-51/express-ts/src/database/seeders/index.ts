import { prisma } from "../../utils/prisma";
import { faker } from "@faker-js/faker";
const main = async () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      name: faker.lorem.sentence(5),
      price: faker.number.int({
        min: 500000,
        max: 2000000,
      }),
      description: faker.lorem.sentences(5),
    });
  }
  await prisma.product.deleteMany({});
  await prisma.product.createMany({
    data,
  });
};
main()
  .then(() => {
    console.log("Run seeding success");
    process.exit();
  })
  .catch(() => {
    console.log("Run seeding failed");
    process.exit();
  });
