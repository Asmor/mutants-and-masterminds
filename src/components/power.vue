<script>
import { EventBus } from "../event-bus.js";
import addon from "./addon.vue";

export default {
	props: [
		"index",
		"power",
	],
	data: function() {
		var vm = this;

		return {
		};
	},
	computed: {
		extras: function () {
			return Object.keys(this.power.definition.extras).sort();
		},
		flaws: function () {
			return Object.keys(this.power.definition.flaws).sort();
		},
	},
	methods: {
		adjustRank: function (amount) {
			EventBus.$emit("adjust-rank", { amount, index: this.index });
		},
		deleteSelf: function () {
			EventBus.$emit("delete-power", { index: this.index });
		},
		toggleAddon: function (type, addon) {
			EventBus.$emit("toggle-power-addon", { type, addon, index: this.index });
		},
	},
	components: {
		addon: addon,
	}
};
</script>

<template>
	<div class="power container">
		<div class="row">
			<div class="col-xs-1 power--delete">
				<button
					class="btn btn-danger"
					@click="deleteSelf()"
				><i class="glyphicon glyphicon-trash"></i></button>
			</div>
			<div class="col-xs-11">
				<div class="power--header">
						<div class="power--name">
							{{ power.name }}, Rank {{ power.rank }}
							<div class="btn-group btn-group-sm">
								<button
									class="btn btn-primary"
									@click="adjustRank(-1)"
								><i class="glyphicon glyphicon-minus"></i></button>
								<button
									class="btn btn-primary"
									@click="adjustRank(1)"
								><i class="glyphicon glyphicon-plus"></i></button>
							</div>
						</div>
						<div class="power--type">{{ power.definition.type }}</div>
				</div>
				<div class="power--info">
					<div class="power--info-section"><b>Action:</b> {{ power.definition.action }}</div>
					<div class="power--info-section"><b>Range:</b> {{ power.definition.range }}</div>
					<div class="power--info-section"><b>Duration:</b> {{ power.definition.duration }}</div>
					<div class="power--info-section"><b>Base Cost:</b> {{ power.definition.costPerRank }} per rank</div>
				</div>
				<div class="power--total-cost">
					<div class="power--info-section"><b>Cost per rank:</b> {{ power.friendlyCostPerRank }}</div>
					<div
						v-if="power.flatCost"
						class="power--info-section"
					>
						<b>Flat cost:</b> {{ power.flatCost }}
					</div>
					<div class="power--info-section"><b>Total cost:</b> {{ power.totalCost }} point(s)</div>
					
				</div>
				<div
					v-if="extras.length"
					class="power--extras"
				>
					<div
						v-for="extra in extras"
						class="power--addon power--addon__extra"
					>
						<addon
							type="extra"
							:name="extra"
							:index="index"
							:definition="power.definition.extras[extra]"
							:tier="power.extras[extra].tier"
						></addon>
					</div>
				</div>
				<div
					v-if="flaws.length"
					class="power--flaws"
				>
					<div
						v-for="flaw in flaws"
						class="power--addon power--addon__flaw"
					>
						<addon
							type="flaw"
							:name="flaw"
							:index="index"
							:definition="power.definition.flaws[flaw]"
							:tier="power.flaws[flaw].tier"
						></addon>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	$power-header: #f67035;
	$power-header-text: #ffffff;
	$power-background: #fbdbc5;
	$power-background-light: #fdf2eb;
	$padding: 10px;

	.power {
		max-width: 800px;

		.power--header {
			font-weight: bold;
			font-size: 1.5em;
			background-color: $power-header;
			color: $power-header-text;
			display: flex;
			justify-content: space-between;
			padding: $padding;
		}

		.power--info {
			background-color: $power-background;
			padding: $padding;
			text-align: center;
		}

		.power--total-cost {
			border: 3px solid $power-background;
			padding: $padding;
			text-align: center;
		}

		.power--info-section {
			display: inline-block;
		}

		.power--extras,
		.power--flaws {
			margin-top: 30px;
			padding: $padding;
			border-top: 1px solid;
			position: relative;

			&::before {
				font-size: 1.5em;
				position: absolute;
				top: 0;
				transform: translateY(-100%);
			}
		}

		.power--extras {
			border-color: green;
			&::before {
				color: green;
				content: "Extras";
			}
		}

		.power--flaws {
			border-color: red;
			&::before {
				color: red;
				content: "Flaws";
			}
		}

		.power--delete {
		}
	}
</style>
