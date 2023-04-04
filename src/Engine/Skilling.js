import { UPDATE_SKILL } from "./Engine";

// Define the list of available items and skills
export const SKILLS = ['constitution', 'cooking', 'gathering'];

export const SKILLING = (currentSkill, setCurrentSkill, player, setPlayer, skill, items) => {
    // Check if the player is already skilling
    if (currentSkill) return;
  
    // Set the current skill to the skill being trained
    setCurrentSkill(skill);
  }