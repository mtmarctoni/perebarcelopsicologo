const EXPERIENCE_START_YEAR = 2018;

export function getYearsOfExperience(): number {
  return new Date().getFullYear() - EXPERIENCE_START_YEAR;
}
