<script>
"use strict";
import power from "./components/power.vue";
import powerList from "./data/powers.json";
import { EventBus } from "./event-bus.js";
import hero from "./model/hero.js";

export default {
	name: 'app',
	data: function () {
		var vm = this;

		return {
			hero,
			powerToAdd: "",
			powerNames: Object.keys(powerList)
				.filter(powerName => powerName && !powerList[powerName].TODO)
				.sort(),
		};
	},
	methods: {
		addPower: function () {
			var name = this.powerToAdd;
			EventBus.$emit("add-power", {
				name,
				definition: powerList[name]
			});
			this.powerToAdd = "";
		},
	},
	components: {
		power,
	},
};
</script>

<template>
	<div id="app">
		<power
			v-for="(power, index) in hero.powers"
			:power="power"
			:index="index"
		></power>
		<select
			@change="addPower()"
			v-model="powerToAdd"
		>
			<option default value="">Select a power</option>
			<option
				v-for="powerName in powerNames"
			>
				{{ powerName }}
			</option>
		</select>
	</div>
</template>

<style lang="scss">
</style>
