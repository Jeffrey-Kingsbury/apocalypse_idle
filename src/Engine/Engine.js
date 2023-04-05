import { EXPERIENCE_TABLE, DEFAULT_PLAYER } from './Defaults';
import { SKILLS } from './Skilling';
import { ITEMS, ITEM_GENERATOR } from './Items';

/**
 * Function to load the player data from localStorage or use default values
 * @returns {object} - The player object
 **/
export const LOAD_PLAYER = async () => {
	// Get player data from localStorage
	const playerLocal = localStorage.getItem('player');

	// If player data exists in localStorage, parse it; otherwise, use the default player object
	const player = playerLocal ? JSON.parse(playerLocal) : DEFAULT_PLAYER;

	// Initialize filtered inventory and skills objects
	const filteredInventory = {};
	const filteredSkills = {};

	/**
	 * The following checks are added in the event that the player object is missing any of the default values.
	 * This can happen if the player object is updated in the future and the player's localStorage data
	 * does not have the new values. This will ensure that the player object always has the correct values.
	 **/
	// Ensure player.inventory exists and has a default value
	player.inventory = player.inventory || DEFAULT_PLAYER.inventory;
	// Ensure player.skills exists and has a default value
	player.skills = player.skills || DEFAULT_PLAYER.skills;
	// Ensure player.health exists and has a default value
	player.health = player.health || DEFAULT_PLAYER.health;
	// Ensure player.max_health exists and has a default value
	player.max_health = player.max_health || DEFAULT_PLAYER.max_health;
	// Ensure player.wallet exists and has a default value
	player.wallet = player.wallet || DEFAULT_PLAYER.wallet;
	// Ensure player.equipped exists and has a default value
	player.equipped = player.equipped || DEFAULT_PLAYER.equipped;

	// Iterate through the list of items to populate the player's inventory
	ITEMS.forEach((item) => {
		if (!player.inventory.hasOwnProperty(item)) {
			filteredInventory[item] = 0;
		}
	});

	// Merge the filteredInventory with the player.inventory
	player.inventory = { ...player.inventory, ...filteredInventory };

	// Iterate through the list of skills to populate the player's skills
	SKILLS.forEach((skill) => {
		filteredSkills[skill] = player.skills[skill] || { xp: 0, level: 1 };
	});

	// Assign the skills to the player object
	player.skills = filteredSkills;
	player.max_health = Math.floor(player.skills.constitution.level * 12.5);

	// Store the updated player object in localStorage
	localStorage.setItem('player', JSON.stringify(player));

	// Return the player object
	return player;
};

/**
 * Function to update the inventory of a player
 * @param {string} item - The name of the item to update
 * @param {number} amount - The amount of the item to add to the inventory
 * @param {object} player - The player object
 * @param {function} setPlayer - The function to update the player state
 **/
export const UPDATE_INVENTORY = (item, amount, player, setPlayer) => {
	// Create a shallow copy of the player object to avoid modifying the original state
	const updatedPlayer = { ...player };
	// Calculate the updated amount of the item in the inventory
	const updatedAmount = (updatedPlayer.inventory[item] || 0) + amount;

	// Update the inventory with the new amount (minimum is 0)
	updatedPlayer.inventory[item] = Math.max(updatedAmount, 0);

	// Update the player state with the modified inventory
	setPlayer(updatedPlayer);
};

/**
 * Function to update the skill of a player
 * @param {string} skill - The name of the skill to update
 * @param {number} xp - The amount of XP to add to the skill
 * @param {object} player - The player object
 * @param {function} setPlayer - The function to update the player state
 **/
export const UPDATE_SKILL = (skill, xp, player, setPlayer) => {
	// Check if the skill exists in the player's skills
	if (!player.skills[skill]) return;

	// Create a shallow copy of the player object to avoid modifying the original state
	const updatedPlayer = { ...player };

	// Calculate the updated XP for the skill
	const updatedXp = updatedPlayer.skills[skill].xp + xp;

	// Calculate the updated level for the skill
	const updatedLevel = EXPERIENCE_TABLE.findIndex((level) => level > updatedXp);

	// Update the skill's level
	updatedPlayer.skills[skill].level = updatedLevel;

	// Update the skill's XP
	updatedPlayer.skills[skill].xp = updatedXp;

	// Update the player state with the modified skills
	setPlayer(updatedPlayer);
};

/**
 * Function to update the health of a player
 * @param {number} amount - The amount to add to the health
 * @param {object} player - The player object
 * @param {function} setPlayer - The function to update the player state
 * @returns {object} - An object containing an error message if the player is dead
 * @example
 * const { message } = UPDATE_HEALTH(-10, player, setPlayer);
 * if (message) {
 *  // Player is dead
 * }
 **/
export const UPDATE_HEALTH = (amount, player, setPlayer, setPlayerDead) => {
	// Create a shallow copy of the player object to avoid modifying the original state
	const updatedPlayer = { ...player };

	// Calculate the updated health
	const updatedHealth = updatedPlayer.health + amount;

	// Update the player's health (minimum is 0) (maximum is max_health)
	updatedPlayer.health = Math.min(Math.max(updatedHealth, 0), updatedPlayer.max_health);

	// Update the player state with the modified health
	setPlayer(updatedPlayer);

	// Check if the player is dead
	if (updatedPlayer.health <= 0) {
		setPlayerDead(true);
	}
};

/**
 * Function to update the wallet of a player
 * @param {number} amount - The amount to add to the wallet
 * @param {object} player - The player object
 * @param {function} setPlayer - The function to update the player state
 * @returns {object} - An object containing an error message if the player does not have enough money
 **/
export const UPDATE_WALLET = (amount, player, setPlayer) => {
	// Create a shallow copy of the player object to avoid modifying the original state
	const updatedPlayer = { ...player };

	// Calculate the updated wallet amount
	const updatedWallet = updatedPlayer.wallet + amount;

	// Check if the player has enough money
	if (updatedWallet < 0) return { error: 'Not enough money!' };

	// Update the player's wallet
	updatedPlayer.wallet = updatedWallet;

	// Update the player state with the modified wallet
	setPlayer(updatedPlayer);
};

/**
 * Function to update the equipped items of a player
 * @param {object} equipment_item - The equipment item to equip
 * @param {object} player - The player object
 * @param {function} setPlayer - The function to update the player state
 **/
export const UPDATE_EQUIPPED = (equipment_item, player, setPlayer) => {
	// Create a shallow copy of the player object to avoid modifying the original state
	const updatedPlayer = { ...player };
	const item_detailed = ITEM_GENERATOR[equipment_item];
	// Check if the player has an item equipped in the same slot and return it to the inventory if so
	if (updatedPlayer.equipped[item_detailed.type]) {
		const item = updatedPlayer.equipped[item_detailed.slot];
		updatedPlayer.equipped[item_detailed.slot] = equipment_item;
		UPDATE_INVENTORY(item, 1, updatedPlayer, setPlayer);
		UPDATE_INVENTORY(equipment_item, -1, updatedPlayer, setPlayer);
	} else {
		// Equip the item
		updatedPlayer.equipped[item_detailed.slot] = equipment_item;

		// Remove the item from the inventory
		UPDATE_INVENTORY(equipment_item, -1, updatedPlayer, setPlayer);
	}

	// Update the player state with the modified equipped items
	setPlayer(updatedPlayer);
};

/**
 * Function to unequip an item from a player
 * @param {string} equipment_slot - The slot of the item to unequip
 * @param {object} player - The player object
 * @param {function} setPlayer - The function to update the player state
 * @returns {object} - An object containing an error message if the player does not have enough money
 **/
export const UNEQUIP_ITEM = (equipment_slot, player, setPlayer) => {
	// Create a shallow copy of the player object to avoid modifying the original state
	const updatedPlayer = { ...player };

	// Retrieve the item from the equipped items
	const item = updatedPlayer.equipped[equipment_slot];

	// Remove the item from the equipped items
	updatedPlayer.equipped[equipment_slot] = null;

	// Add the item to the inventory
	if (item) UPDATE_INVENTORY(item, 1, updatedPlayer, setPlayer);

	// Update the player state with the modified equipped items
	setPlayer(updatedPlayer);
};


export const CALCULATE_EQUPIMENT_BONUS = (player) => {
	const stats = {
		attack: 0,
		defence: 0,
		strength: 0,
		guns:0,
		weight: 0,
	};

	Object.values(player.equipped).forEach((item) => {
		if(!item) return;
		if (item) {
			stats.attack += ITEM_GENERATOR[item].bonusStats.attack;
			stats.defence += ITEM_GENERATOR[item].bonusStats.defence;
			stats.strength += ITEM_GENERATOR[item].bonusStats.strength;
			stats.guns += ITEM_GENERATOR[item].bonusStats.guns;
			stats.weight += ITEM_GENERATOR[item].weight;
		}
	});

	return stats;
};