// Define the list of available items and skills
const ITEMS = ["scrap metal", "wood", "plant fiber", "rope"];
const SKILLS = ["cooking", "gathering"];

// Default player object
const DEFAULT_PLAYER = {
  health: 100,
  inventory: {},
  skills: {},
};

/*
* Function to load the player data from localStorage or use default values
* @returns {object} - The player object
*/
export const LOAD_PLAYER = async() => {
  // Get player data from localStorage
  const playerLocal = localStorage.getItem("player");

  // If player data exists in localStorage, parse it; otherwise, use the default player object
  const player = playerLocal ? JSON.parse(playerLocal) : DEFAULT_PLAYER;

  // Initialize filtered inventory and skills objects
  const filteredInventory = {};
  const filteredSkills = {};

  // Ensure player.inventory exists and has a default value
  player.inventory = player.inventory || {};

  // Iterate through the list of items to populate the player's inventory
  ITEMS.forEach((item) => {
    filteredInventory[item] = player.inventory[item] || 0;
  });

  // Ensure player.skills exists and has a default value
  player.skills = player.skills || {};

  // Iterate through the list of skills to populate the player's skills
  SKILLS.forEach((skill) => {
    filteredSkills[skill] = player.skills[skill] || { xp: 0 };
  });

  // Remove any items or skills from the player object that are not in the initial arrays
  Object.keys(player.inventory).forEach((item) => {
    if (!ITEMS.includes(item)) {
      delete player.inventory[item];
    }
  });

  Object.keys(player.skills).forEach((skill) => {
    if (!SKILLS.includes(skill)) {
      delete player.skills[skill];
    }
  });

  // Assign the filtered inventory and skills to the player object
  player.inventory = filteredInventory;
  player.skills = filteredSkills;

  // Store the updated player object in localStorage
  localStorage.setItem("player", JSON.stringify(player));

  // Return the player object
  return player;
};

/*
* Function to update the inventory of a player
* @param {string} item - The name of the item to update
* @param {number} amount - The amount of the item to add to the inventory
* @param {object} player - The player object
* @param {function} setPlayer - The function to update the player state
*/
export const UPDATE_INVENTORY = (item, amount, player, setPlayer) => {
  // Check if the item is in the list of allowed items
  if (!ITEMS.includes(item)) return;

  // Create a shallow copy of the player object to avoid modifying the original state
  const updatedPlayer = { ...player };

  // Calculate the updated amount of the item in the inventory
  const updatedAmount = (updatedPlayer.inventory[item] || 0) + amount;

  // Update the inventory with the new amount (minimum is 0)
  updatedPlayer.inventory[item] = Math.max(updatedAmount, 0);

  // Update the player state with the modified inventory
  setPlayer(updatedPlayer);
};

/* 
* Function to update the skill of a player
* @param {string} skill - The name of the skill to update
* @param {number} xp - The amount of XP to add to the skill
* @param {object} player - The player object
* @param {function} setPlayer - The function to update the player state
*/
export const UPDATE_SKILL = (skill, xp, player, setPlayer) => {
  // Check if the skill exists in the player's skills
  if (!player.skills[skill]) return;

  // Create a shallow copy of the player object to avoid modifying the original state
  const updatedPlayer = { ...player };

  // Calculate the updated XP for the skill
  const updatedXp = updatedPlayer.skills[skill].xp + xp;

  // Update the skill's XP
  updatedPlayer.skills[skill].xp = updatedXp;

  // Update the player state with the modified skills
  setPlayer(updatedPlayer);
};

