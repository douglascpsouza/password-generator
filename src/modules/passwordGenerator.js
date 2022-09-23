// Password Generator

// Random integer between min and max
const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

// Digit generator
const digitGen = () => String.fromCharCode(rand(48, 57));

// Uppercase generator
const upperGen = () => String.fromCharCode(rand(65, 90));

// Lowercase generator
const lowerGen = () => String.fromCharCode(rand(97, 122));

// Symbol generator
const symbolList = "!#$%&()*+-,./:@[]^{}";
const symbolGen = () => symbolList[rand(0, symbolList.length - 1)];

// Choose functions that generate characters
function chooseGenerators(hasDigit, hasUpper, hasLower, hasSymbol) {
  const allGenerators = [
    { gen: digitGen, type: hasDigit, weight: 3 },
    { gen: upperGen, type: hasUpper, weight: 5 },
    { gen: lowerGen, type: hasLower, weight: 5 },
    { gen: symbolGen, type: hasSymbol, weight: 2 },
  ];
  return allGenerators.filter(generator => generator.type);
}

// Shufle password array using Fisher-Yates Algorithm - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Generate Password
export default function generatePassword(passwordLength = 10, hasDigit = true, hasUpper = true, hasLower = true, hasSymbol = true) {
  if (!Number(passwordLength) || Number(passwordLength) < 6) return '';
  if (!hasDigit && !hasUpper && !hasLower && !hasSymbol) return '';

  const passwordLen = Number(passwordLength)
  const generators = chooseGenerators(hasDigit, hasUpper, hasLower, hasSymbol);

  let totalWeight = 0;
  generators.forEach(generator => {
    totalWeight += generator.weight;
  });

  const passwordArray = [];
  let numOfChars = 0;
  generators.forEach(generator => {
    numOfChars = Math.round(passwordLen * (generator.weight / totalWeight));
    for (let i = 0; i < numOfChars; i++) {
      passwordArray.push(generator.gen());
    }
  });
  // Return a shuffled array as String
  return shuffleArray(passwordArray).join('').slice(0, passwordLen);
}
