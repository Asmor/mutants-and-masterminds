"use strict";

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

export default PowerAddon;
