// Define the list of available items and skills
export const ITEMS = ["scrap metal", "wood", "plant fiber", "rope"];
export const SKILLS = ["constitution", "cooking", "gathering"];

// Define the experience table
export const EXPERIENCE_TABLE = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411,
  2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824,
  12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648,
  37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
  111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886,
  273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032,
  668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581,
  1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594,
  3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629,
  7944614, 8771558, 9684577, 10692629, 11805606, 13034431, 255500000,
];

// Default player object
export const DEFAULT_PLAYER = {
  health: 10,
  max_health: 10,
  wallet: 0,
  inventory: {},
  skills: {},
  equipped: {
    weapon: null,
    shield: null,
    chest: null,
    legs: null,
    feet: null,
    head: null,
    hands: null,
    neck: null,
    ring: null,
    ring2: null,
  },
};

export const EQUIPMENT = {
  weapon: ["stick", "metal pipe"],
  shield: ["wooden shield", "metal shield"],
  chest: ["leather armor", "metal armor"],
  legs: ["leather pants", "metal pants"],
  feet: ["leather boots", "metal boots"],
  head: ["leather helmet", "metal helmet"],
  hands: ["leather gloves", "metal gloves"],
  neck: ["leather necklace", "metal necklace"],
  ring: ["leather ring", "metal ring"],
};

export const EQUIPMENT_STATS = {
  'stick': {
    damage: 1,
    speed: 1,
    weight: 1,
    value: 1,
    description: "A stick",
    name: "stick",
    type: "weapon",
    two_hand: false,
  },
  "metal pipe": {
    damage: 2,
    speed: 1,
    weight: 1,
    value: 1,
    description: "A metal pipe",
    name: "metal pipe",
    type: "weapon",
    two_hand: false,
  },
  "wooden shield": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "A wooden shield",
    name: "wooden shield",
    type: "shield",
  },
  "metal shield": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "A metal shield",
    name: "metal shield",
    type: "shield",
  },

  "leather armor": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather armor",
    name: "leather armor",
    type: "chest",
  },
  "metal armor": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal armor",
    name: "metal armor",
    type: "chest",
  },
  "leather pants": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather pants",
    name: "leather pants",
    type: "legs",
  },
  "metal pants": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal pants",
    name: "metal pants",
    type: "legs",
  },
  "leather boots": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather boots",
    name: "leather boots",
    type: "feet",
  },
  "metal boots": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal boots",
    name: "metal boots",
    type: "feet",
  },
  "leather helmet": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather helmet",
    name: "leather helmet",
    type: "head",
  },
  "metal helmet": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal helmet",
    name: "metal helmet",
    type: "head",
  },
  "leather gloves": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather gloves",
    name: "leather gloves",
    type: "hands",
  },
  "metal gloves": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal gloves",
    name: "metal gloves",
    type: "hands",
  },
  "leather necklace": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather necklace",
    name: "leather necklace",
    type: "neck",
  },
  "metal necklace": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal necklace",
    name: "metal necklace",
    type: "neck",
  },
  "leather ring": {
    defense: 1,
    weight: 1,
    value: 1,
    description: "Leather ring",
    name: "leather ring",
    type: "ring",
  },
  "metal ring": {
    defense: 2,
    weight: 1,
    value: 1,
    description: "Metal ring",
    name: "metal ring",
    type: "ring",
  },
};
