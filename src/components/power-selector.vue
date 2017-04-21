<script>
"use strict";
import { EventBus } from "../event-bus.js";
import powerList from "../data/powers.json";

import power from "./power.vue";


export default {
	name: 'app',
	data: function () {
		var vm = this;

		return {
			powerToAdd: "",
		};
	},
	computed: {
		powerNames: function () {
			return Object.keys(powerList)
				.filter(powerName => powerName && !powerList[powerName].TODO)
				.sort();
		},
	},
	props: [
		"id",
		"powerCollection",
	],
	methods: {
		addPower: function () {
			EventBus.$emit("add-power", {
				id: this.id,
				name: this.powerToAdd,
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
			v-for="(power, index) in powerCollection"
			:power="power"
			:id="id"
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
