class DEFAULT_ITEM {
	constructor(id, name, description, type, value, weight) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.value = value;
		this.weight = weight;
	}
}

class WEAPON extends DEFAULT_ITEM {
	constructor(id, name, description, value, weight, damage, twoHand, requiredLevels, bonusStats, slot) {
		super(id, name, description, 'WEAPON', value, weight);
		this.damage = damage;
		this.twoHand = twoHand;
		this.requiredLevels = requiredLevels;
		this.bonusStats = bonusStats;
		this.slot = slot;
	}
}

class MATERIAL extends DEFAULT_ITEM {
	constructor(id, name, description, value, weight) {
		super(id, name, description, 'MATERIAL', value, weight);
	}
}

class FOOD extends DEFAULT_ITEM {
	constructor(id, name, description, value, weight, health, requiredLevels) {
		super(id, name, description, 'FOOD', value, weight);
		this.health = health;
		this.requiredLevels = requiredLevels;
	}
}

class RAW_FOOD extends DEFAULT_ITEM {
	constructor(id, name, description, value, weight, requiredLevels) {
		super(id, name, description, 'RAW_FOOD', value, weight);
		this.requiredLevels = requiredLevels;
	}
}

class BURNT_FOOD extends DEFAULT_ITEM {
	constructor(id, name, description, weight) {
		super(id, name, description, 'BURNT_FOOD', 0, weight, null);
	}
}

class EQUIPMENT extends DEFAULT_ITEM {
	constructor(id, name, description, value, weight, defense, slot, stats, requiredLevels) {
		super(id, name, description, 'EQUIPMENT', value, weight);
		this.defense = defense;
		this.slot = slot;
		this.stats = stats;
		this.requiredLevels = requiredLevels;
	}
}
export const ITEM_GENERATOR = {
	stick: new WEAPON('stick', 'Stick', 'A stick', 1, 1, 1, true, { str: 1 }, { attack: 2}, 'weapon'),
	fish: new FOOD('fish', 'Fish', 'A fish', 1, 1, 1, 1, { cooking: 1 }),
};

export const ITEMS = [];

Object.keys(ITEM_GENERATOR).forEach((item) => {
	ITEMS.push(item);

	// If the item is a food, add a raw and burnt version of the food item
	if (ITEM_GENERATOR[item].type == 'FOOD') {
		ITEMS.push(new BURNT_FOOD(item + '_burnt', item + ' (burnt)', 'A burnt ' + item, 1, 1).name);
		ITEMS.push(
			new RAW_FOOD(item + '_raw', item + ' (raw)', 'A raw ' + item, 1, 1, 1, {
				cooking: 1,
			}).name
		);
	}
});
