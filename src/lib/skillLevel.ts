export function parseSkillYears(experience: string): number {
  const match = experience.match(/(\d+)/)
  return match ? Number(match[1]) : 0
}
