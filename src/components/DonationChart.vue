<template>
  <div class="donation-chart">
    <v-card flat>
      <v-card-title>
        <span class="text-h6">{{ $t('donate.analytics.title') }}</span>
        <v-spacer></v-spacer>
        <v-select
          v-model="selectedTimeRange"
          :items="timeRanges"
          item-text="label"
          item-value="value"
          dense
          outlined
          hide-details
          style="max-width: 200px"
          @change="onTimeRangeChange"
        ></v-select>
      </v-card-title>
      <v-card-text>
        <div v-if="isLoading" class="text-center py-8">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-else-if="!hasData" class="text-center py-8">
          <v-icon large color="grey">mdi-chart-line</v-icon>
          <p class="grey--text mt-2">{{ $t('donate.analytics.noData') }}</p>
        </div>
        <canvas v-else ref="chartCanvas"></canvas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'DonationChart',

  data() {
    return {
      selectedTimeRange: 30,
      chart: null,
      isLoading: false,
    };
  },

  computed: {
    timeRanges() {
      return [
        { label: this.$t('donate.analytics.last7Days'), value: 7 },
        { label: this.$t('donate.analytics.last30Days'), value: 30 },
        { label: this.$t('donate.analytics.last90Days'), value: 90 },
        { label: this.$t('donate.analytics.allTime'), value: 0 },
      ];
    },

    donationData() {
      return this.$store.state.donationAnalytics || [];
    },

    hasData() {
      return this.donationData && this.donationData.length > 0;
    },

    chartData() {
      if (!this.hasData) {
        return { labels: [], datasets: [] };
      }

      const labels = this.donationData.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString(this.$i18n.locale, {
          month: 'short',
          day: 'numeric'
        });
      });

      const data = this.donationData.map(item => item.amount);

      return {
        labels,
        datasets: [{
          label: this.$t('donate.analytics.donationAmount'),
          data,
          borderColor: '#1976D2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#1976D2',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }]
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: this.$vuetify.theme.dark ? '#fff' : '#666',
            fontSize: 12,
            padding: 15,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: this.$vuetify.theme.dark ? '#fff' : '#666',
              callback: function(value) {
                return '$' + value.toFixed(2);
              }
            },
            gridLines: {
              color: this.$vuetify.theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: this.$vuetify.theme.dark ? '#fff' : '#666',
            },
            gridLines: {
              color: this.$vuetify.theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFontSize: 13,
          bodyFontSize: 12,
          cornerRadius: 4,
          callbacks: {
            label: function(tooltipItem) {
              return '$' + tooltipItem.yLabel.toFixed(2);
            }
          }
        }
      };
    }
  },

  watch: {
    donationData() {
      this.renderChart();
    }
  },

  mounted() {
    this.loadData();
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },

  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('getDonationAnalytics', this.selectedTimeRange);
      } catch (error) {
        console.error('Error loading donation analytics:', error);
      } finally {
        this.isLoading = false;
      }
    },

    onTimeRangeChange() {
      this.loadData();
    },

    renderChart() {
      if (!this.hasData) {
        return;
      }

      this.$nextTick(() => {
        const canvas = this.$refs.chartCanvas;
        if (!canvas) {
          return;
        }

        // Destroy existing chart if it exists
        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.chartData,
          options: this.chartOptions
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.donation-chart {
  margin-bottom: 1.5rem;
}
</style>
