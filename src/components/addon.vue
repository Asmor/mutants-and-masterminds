<script>
import { EventBus } from "../event-bus.js";

export default {
	props: [
		"type",
		"name",
		"id",
		"index",
		"definition",
		"tier",
	],
	methods: {
		toggleAddon: function () {
			EventBus.$emit("toggle-power-addon", { type: this.type, addon: this.name, id: this.id, index: this.index });
		},
	},
};
</script>

<template>
	<div class="addon">
		<label
			@click="toggleAddon()"
		>
			<i
				v-if="tier"
				class="glyphicon glyphicon-check"
			></i>
			<b>{{ name }}</b>
			<span v-if="definition.maxTier > 1">(Tier {{ tier }})</span>
		</label>
		<span v-if="definition.costPerRank">
			<span v-if="definition.maxTier > 1">
				({{ definition.costPerRank }} per tier per rank, max {{ definition.maxTier }} tiers)
			</span>
			<span v-else>
				({{ definition.costPerRank }} per rank)
			</span>
		</span>
		<span v-if="definition.flatCost">
			<span v-if="definition.maxTier > 1">
				(Flat {{ definition.flatCost }} per tier, max {{ definition.maxTier }} tiers)
			</span>
			<span v-else>
				(Flat {{ definition.flatCost }})
			</span>
		</span>
	</div>
</template>

<style lang="scss">
</style>
