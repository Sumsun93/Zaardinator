export const pickRandomValueInArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
}

export const getRandomInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
