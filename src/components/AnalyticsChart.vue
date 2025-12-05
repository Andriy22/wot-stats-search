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
          :height="chartHeight"
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
import { getChartOptions, getBarColors, CHART_COLORS, CHART_STYLES } from './AnalyticsChartConfig';

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
    /**
     * Chart height from configuration
     */
    chartHeight() {
      return CHART_STYLES.height;
    },

    /**
     * Chart options from configuration
     */
    chartOptions() {
      return getChartOptions();
    },

    /**
     * Aggregate queue data by date for the last 7 days
     */
    chartData() {
      const last7Days = this.getLast7Days();
      const dateCounts = this.aggregateByDate(last7Days);

      return {
        labels: last7Days.map(date => this.formatDateLabel(date)),
        datasets: [
          {
            label: 'Players Added',
            backgroundColor: getBarColors(last7Days.length),
            borderColor: CHART_COLORS.border,
            borderWidth: CHART_STYLES.borderWidth,
            borderRadius: CHART_STYLES.borderRadius,
            data: last7Days.map(date => dateCounts[date] || 0)
          }
        ]
      };
    }
  },
  methods: {
    /**
     * Get array of last 7 days in YYYY-MM-DD format
     * @returns {Array<string>} Array of date strings
     */
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

    /**
     * Format date to YYYY-MM-DD
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date string
     */
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    /**
     * Format date for chart label (e.g., "Mon, Dec 1")
     * @param {string} dateString - Date string in YYYY-MM-DD format
     * @returns {string} Formatted date label
     */
    formatDateLabel(dateString) {
      const date = new Date(dateString + 'T00:00:00');
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },

    /**
     * Aggregate queue data by date
     * @param {Array<string>} last7Days - Array of date strings
     * @returns {Object} Object with date keys and count values
     */
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
