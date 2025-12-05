<template>
  <v-card class="analytics-chart-container" elevation="2">
    <v-card-title>
      {{ $t('queue.analytics') || 'Queue Analytics' }}
    </v-card-title>
    <v-card-text>
      <div class="chart-wrapper">
        <Bar
          :data="chartData"
          :options="chartOptions"
          :height="300"
        />
      </div>
    </v-card-text>
  </v-card>
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "AnalyticsChart",
  components: {
    Bar
  },
  props: {
    queueData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // Aggregate queue data by date for the last 7 days
    chartData() {
      const last7Days = this.getLast7Days();
      const dateCounts = this.aggregateByDate(last7Days);

      return {
        labels: last7Days.map(date => this.formatDateLabel(date)),
        datasets: [
          {
            label: 'Players Added',
            backgroundColor: last7Days.map((_, index) => {
              // Alternate between two shades of purple based on the design
              return index % 2 === 0 ? 'rgba(139, 127, 214, 0.4)' : 'rgba(139, 127, 214, 1)';
            }),
            borderColor: 'rgba(139, 127, 214, 1)',
            borderWidth: 0,
            borderRadius: 4,
            data: last7Days.map(date => dateCounts[date] || 0)
          }
        ]
      };
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
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(139, 127, 214, 1)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: (context) => {
                return context[0].label;
              },
              label: (context) => {
                return `Players: ${context.parsed.y}`;
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
              color: '#9e9e9e',
              font: {
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#9e9e9e',
              font: {
                size: 12
              },
              stepSize: 1,
              precision: 0
            }
          }
        }
      };
    }
  },
  methods: {
    // Get array of last 7 days in YYYY-MM-DD format
    getLast7Days() {
      const days = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        days.push(this.formatDate(date));
      }

      return days;
    },

    // Format date to YYYY-MM-DD
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // Format date for chart label (e.g., "Mon, Dec 1")
    formatDateLabel(dateString) {
      const date = new Date(dateString + 'T00:00:00');
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },

    // Aggregate queue data by date
    aggregateByDate(last7Days) {
      const counts = {};

      // Initialize all dates with 0
      last7Days.forEach(date => {
        counts[date] = 0;
      });

      // Count entries per day
      this.queueData.forEach(item => {
        if (item.date) {
          // Extract date portion from datetime string (handles formats like "2024-12-05" or "2024-12-05T10:30:00")
          const dateOnly = item.date.split('T')[0];

          if (counts.hasOwnProperty(dateOnly)) {
            counts[dateOnly]++;
          }
        }
      });

      return counts;
    }
  }
};
</script>

<style lang="scss" scoped>
.analytics-chart-container {
  margin: 1rem;
}

.chart-wrapper {
  position: relative;
  height: 300px;
}
</style>
