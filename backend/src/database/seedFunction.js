import bcrypt from "bcryptjs";
import {
  generateRandomCI,
  generateRandomColor,
  generateRandomEmail,
  generateRandomFirstName,
  generateRandomLastName,
  generateRandomPhone,
  generateRandomRFID,
  generateRandomValue,
  getRandomNumberUpToN,
} from "./generateFunction.js";
import { Card, CardType } from "../models/Card.js";
import { Role } from "../models/Role.js";
import { TimeTable } from "../models/TimeTable.js";
import { Turnstile } from "../models/Turnstile.js";
import { Employee, User } from "../models/User.js";

export const seedCardTypes = async (n = 10) => {
  for (let i = 0; i < n; i++) {
    await CardType.create({
      name: `Tipo ${i + 1}`,
      color: generateRandomColor(),
      description: `Descripción ${i + 1}`,
    });
  }
};

export const seedCards = async (n = 10, nct = 10) => {
  for (let i = 0; i < n; i++) {
    await Card.create({
      rfid: generateRandomRFID(),
      description: `Descripción ${i + 1}`,
      cardTypeId: getRandomNumberUpToN(nct),
    });
  }
};

export const seedRoles = async (n = 10) => {
  for (let i = 0; i < n; i++) {
    await Role.create({
      name: `Rol ${i + 1}`,
      description: `Descripción ${i + 1}`,
    });
  }
};

export const seedUsers = async (n = 10, nr = 10) => {
  for (let i = 0; i < n; i++) {
    const newUser = await User.create({
      firstName: generateRandomFirstName(),
      lastName: generateRandomLastName(),
      ci: generateRandomCI(),
      address: `Calle ${generateRandomLastName()} Nro. ${generateRandomValue(
        1,
        1000
      )}`,
      phone: generateRandomPhone(),
      inside: false,
    });
    const passwordHash = await bcrypt.hash("password", 10);
    await Employee.create({
      email: generateRandomEmail(),
      password: passwordHash,
      status: 1,
      staff: false,
      admin: false,
      roleId: getRandomNumberUpToN(nr),
      userId: newUser.id,
    });
  }
};

export const seedTimeTables = async (n = 10) => {
  for (let i = 0; i < n; i++) {
    n;
    await TimeTable.create({
      title: `Horario ${i + 1}`,
      description: `Descripción ${i + 1}`,
      toleranceDelay: generateRandomValue(0, 60),
      toleranceLack: generateRandomValue(0, 60),
      toleranceOutput: generateRandomValue(0, 60),
      earlyExit: generateRandomValue(0, 60),
      punctuality: generateRandomValue(0, 60),
      priority: generateRandomValue(0, 60),
      schedule: {
        Monday: { entry: "09:00", exit: "17:00", enable: true },
        Tuesday: { entry: "09:00", exit: "17:00", enable: true },
        Wednesday: { entry: "09:00", exit: "17:00", enable: true },
        Thursday: { entry: "09:00", exit: "17:00", enable: true },
        Friday: { entry: "09:00", exit: "17:00", enable: true },
        Saturday: { entry: "09:00", exit: "12:30", enable: false },
      },
    });
  }
};

export const seedTurnstiles = async (n = 10) => {
  for (let i = 0; i < n; i++) {
    await Turnstile.create({
      name: `Molino ${i + 1}`,
      description: `Descripción ${i + 1}`,
    });
  }
};
