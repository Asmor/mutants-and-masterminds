"use strict";

import { EventBus } from "./event-bus.js";
import powerList from "./data/powers.json";

function registerPowerEventHandlers({ target, target_id }) {
	var addPowerHandler = function ({ id, name }) {
		if ( id === target_id ) {
			var definition = powerList[name];

			target.addPower({ name, definition });
		}
	};

	var adjustRankHandler = function ({ id, index, amount }) {
		if ( id === target_id ) {
			target.adjustPowerRank({ index, amount });
		}
	};

	var deletePowerHandler = function ({ id, index }) {
		if ( id === target_id ) {
			target.deletePower({ index });
		}
	};

	var togglePowerAddonHandler = function ({ id, index, type, addon }) {
		if ( id === target_id ) {
			target.togglePowerAddon({ index, type, addon });
		}
	};

	EventBus.$on("add-power",          addPowerHandler);
	EventBus.$on("adjust-rank",        adjustRankHandler);
	EventBus.$on("delete-power",       deletePowerHandler);
	EventBus.$on("toggle-power-addon", togglePowerAddonHandler);

	// Return a function that can be called to unregister all the handlers
	return function () {
		EventBus.$off("add-power",          addPowerHandler);
		EventBus.$off("adjust-rank",        adjustRankHandler);
		EventBus.$off("delete-power",       deletePowerHandler);
		EventBus.$off("toggle-power-addon", togglePowerAddonHandler);
	};
}

export {
	registerPowerEventHandlers
};
