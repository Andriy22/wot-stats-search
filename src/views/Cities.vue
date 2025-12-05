<template>
  <div class="cities">
    <v-card>
      <v-card-text class="pa-4">
        <v-data-table
          :headers="headers"
          :items="cities"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:item.population="{ item }">
            {{ formatPopulation(item.population) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Cities",
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Population", value: "population", sortable: true },
        { text: "Location", value: "location", sortable: true },
      ],
      cities: [
        { name: "Kyiv", population: 2967000, location: "Ukraine" },
        { name: "Warsaw", population: 1794000, location: "Poland" },
        { name: "Berlin", population: 3671000, location: "Germany" },
        { name: "Paris", population: 2148000, location: "France" },
        { name: "Toronto", population: 2732000, location: "Canada" },
      ],
    };
  },
  methods: {
    formatPopulation(population: number): string {
      return population.toLocaleString();
    },
  },
});
</script>

<style scoped>
</style>
