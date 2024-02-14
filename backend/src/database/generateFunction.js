import {
  characters,
  domains,
  firstNames,
  lastNames,
  phonePrefixes,
} from "./dataForGeneration.js";

export const generateRandomRFID = () => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const generateRandomEmail = () => {
  const username = Math.random().toString(36).substring(2, 10);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
};

export const generateRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomFirstName = () => {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

export const generateRandomLastName = () => {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

export const generateRandomCI = () => {
  return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
};

export const generateRandomPhone = () => {
  const randomNumber = Math.floor(Math.random() * 10000000);
  return `(${
    phonePrefixes[Math.floor(Math.random() * phonePrefixes.length)]
  }) 555-${randomNumber.toString().padStart(4, "0")}`;
};

export const getRandomNumberUpToN = (n) => {
  return Math.floor(Math.random() * n) + 1;
};
