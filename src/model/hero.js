"use strict";

import { EventBus } from "../event-bus.js";
import powerList from "../data/powers.json";

var hero = {
	powers: []
};

EventBus.$on("add-power", function ({ name }) {
	var definition = powerList[name];

	hero.powers.push(new Power({ name, definition }));
});

EventBus.$on("adjust-rank", function ({ index, amount }) {
	hero.powers[index].adjustRank(amount);
});

EventBus.$on("delete-power", function ({ index }) {
	hero.powers.splice(index, 1);
});

EventBus.$on("toggle-power-addon", function ({ index, type, addon }) {
	hero.powers[index].toggleAddon({ type, addon });
});

class Power {
	constructor({name, definition}) {
		this.name = name;
		this.definition = definition;
		this.rank = 0;
		this.extras = {};
		this.flaws = {};
		this.minRanks = definition.minRanks || 0;
		this.maxRanks = definition.maxRanks || 20;

		Object.keys(definition.extras).forEach( extra => this.extras[extra] = new PowerAddon({ definition: definition.extras[extra] }) );
		Object.keys(definition.flaws).forEach( flaw => this.flaws[flaw] = new PowerAddon({ definition: definition.flaws[flaw] }) );

		// sets this.actualCostPerRank and this.friendlyCostPerRank
		this.recalculateCostPerRank();

		// sets this.totalCost
		this.setTotalCost();
	}

	adjustRank(amount) {
		this.rank += amount;
		if ( this.rank < this.minRanks ) {
			this.rank = this.minRanks;
		} else if ( this.rank > this.maxRanks ) {
			this.rank = this.maxRanks;
		}

		this.setTotalCost();
	}

	recalculateCostPerRank() {
		var cost = this.definition.costPerRank;

		var power = this;
		[this.extras, this.flaws].forEach(function (collection) {
			Object.keys(collection)
			.map(key => collection[key])
			.filter(addon => addon.tier > 0)
			.forEach(addon => cost += addon.actualCostPerRank);
		});

		if ( cost >= 1 ) {
			this.friendlyCostPerRank = cost;
		} else {
			let denominator = 2 - cost;
			cost = 1 / denominator;
			this.friendlyCostPerRank = "1/" + denominator;
		}

		this.actualCostPerRank = cost;

		this.setTotalCost();
	}

	setTotalCost() {
		var rankCost = Math.ceil(this.rank * this.actualCostPerRank);
		var flatCost = 0;

		[this.extras, this.flaws].forEach(function (collection) {
			Object.keys(collection)
			.map(key => collection[key])
			.filter(addon => addon.tier > 0)
			.forEach(addon => flatCost += addon.actualFlatCost);
		});

		this.flatCost = flatCost;
		this.totalCost = rankCost + flatCost;
	}

	toggleAddon({ type, addon }) {
		var target = this.extras;
		if ( type === "flaw" ) {
			target = this.flaws;
		}

		target[addon].toggle(1);

		this.recalculateCostPerRank();
	}
}

class PowerAddon {
	constructor({ definition }) {
		this.costPerRank = definition.costPerRank || 0;
		this.flatCost = definition.flatCost || 0;
		this.tier = 0;
		this.maxTier = definition.maxTier || 1;
		this.definition = definition;

		this.recalculateCost();
	}

	recalculateCost() {
		this.actualCostPerRank = this.costPerRank * this.tier;
		this.actualFlatCost = this.flatCost * this.tier;
	}

	toggle(amount) {
		this.tier += amount;
		this.tier = this.tier % (this.maxTier + 1);

		this.recalculateCost();
	}
}

export default hero;
