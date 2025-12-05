<template>
  <div class="chart-container">
    <v-card elevation="2" class="pa-4">
      <v-card-title class="text-h6 pb-2">Player Queue History</v-card-title>
      <v-card-text v-if="chartData.labels.length === 0" class="text-center py-8">
        <v-icon large color="grey lighten-1">mdi-chart-bar</v-icon>
        <div class="text-subtitle-1 grey--text text--lighten-1 mt-2">No data available</div>
      </v-card-text>
      <v-card-text v-else>
        <Bar
          :chart-data="chartData"
          :chart-options="chartOptions"
          :height="250"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'PlayerHistoryChart',
  components: {
    Bar
  },
  computed: {
    playerHistory() {
      return this.$store.getters.getHistory;
    },
    chartData() {
      return this.processHistoryData();
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                return context[0].label;
              },
              label: (context) => {
                const count = context.parsed.y;
                return `Players: ${count}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#666'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 12
              },
              color: '#666'
            },
            grid: {
              color: '#e0e0e0',
              lineWidth: 1
            }
          }
        }
      };
    }
  },
  methods: {
    processHistoryData() {
      // If no history data, return empty chart data
      if (!this.playerHistory || this.playerHistory.length === 0) {
        return {
          labels: [],
          datasets: []
        };
      }

      // Group players by date (day)
      const dateMap = new Map();

      this.playerHistory.forEach(player => {
        if (!player.date) return;

        // Parse the date and get the day (UTC)
        const dateObj = new Date(player.date);
        const dayKey = new Date(Date.UTC(
          dateObj.getUTCFullYear(),
          dateObj.getUTCMonth(),
          dateObj.getUTCDate()
        )).toISOString().split('T')[0];

        if (dateMap.has(dayKey)) {
          dateMap.set(dayKey, dateMap.get(dayKey) + 1);
        } else {
          dateMap.set(dayKey, 1);
        }
      });

      // Sort by date and get last 7 days (or all if less than 7)
      const sortedDates = Array.from(dateMap.entries())
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .slice(-7);

      // Format labels as "Mon, Dec 1"
      const labels = sortedDates.map(([dateStr]) => {
        const date = new Date(dateStr);
        const options = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-US', options);
      });

      // Get counts
      const data = sortedDates.map(([, count]) => count);

      // Create gradient-like colors for bars (alternating shades of purple/blue)
      // Matching the mockup design with two tones
      const backgroundColors = data.map((_, index) => {
        // Alternate between lighter and darker purple shades
        return index % 2 === 0 ? 'rgba(176, 167, 218, 0.9)' : 'rgba(139, 107, 204, 0.95)';
      });

      return {
        labels: labels,
        datasets: [
          {
            label: 'Players Added',
            data: data,
            backgroundColor: backgroundColors,
            borderRadius: 4,
            barThickness: 40
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  margin: 1rem;
}
</style>
