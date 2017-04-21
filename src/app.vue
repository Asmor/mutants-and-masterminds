<script>
"use strict";
import powerList from "./data/powers.json";
import { EventBus } from "./event-bus.js";
import { registerPowerEventHandlers } from "./util.js";

import Hero from "./model/hero.js";

import powerSelector from "./components/power-selector.vue";

var hero = new Hero();
var HERO_ID = "hero";

registerPowerEventHandlers({
	target: hero,
	target_id: HERO_ID,
});

export default {
	name: 'app',
	data: function () {
		return {
			hero,
			HERO_ID,
		};
	},
	components: {
		powerSelector,
	},
};
</script>

<template>
	<div id="app">
	<power-selector
		:id="HERO_ID"
		:power-collection="hero.powers"
	></power-selector>
	</div>
</template>

<style lang="scss">
</style>
