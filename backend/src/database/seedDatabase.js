import {
  seedCardTypes,
  seedCards,
  seedRoles,
  seedUsers,
  seedTimeTables,
  seedTurnstiles,
} from "./seedFunction.js";

async function seedDatabase(callback) {
  await seedCardTypes(20);
  await seedCards(20, 20);
  await seedRoles(20);
  await seedUsers(50, 20);
  await seedTimeTables(20);
  await seedTurnstiles(20);

  if (callback && typeof callback === "function") {
    callback();
  }
}

seedDatabase(() => {
  console.log("Seed completed successfully!");
});
