"use strict";

import Power from "./power.js";

import { EventBus } from "../event-bus.js";
import powerList from "../data/powers.json";

class Hero {
	constructor() {
		this.powers = [];
	}

	addPower({ name, definition }) {
		this.powers.push(new Power({name, definition}));
	}

	adjustPowerRank({ index, amount }) {
		this.powers[index].adjustRank(amount);
	}

	deletePower({ index }) {
		this.powers.splice(index, 1);
	}

	togglePowerAddon({ index, type, addon }) {
		this.powers[index].toggleAddon({ type, addon });
	}
}

export default Hero;
