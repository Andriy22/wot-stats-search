/**
 * Chart.js configuration for Analytics Chart
 * Contains all chart options and settings
 */

/**
 * Get chart options configuration
 * @returns {Object} Chart.js options object
 */
export function getChartOptions() {
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

/**
 * Get background colors for chart bars
 * Alternates between two shades of purple based on design
 * @param {number} length - Number of bars
 * @returns {Array<string>} Array of color strings
 */
export function getBarColors(length) {
  return Array.from({ length }, (_, index) => {
    return index % 2 === 0 ? 'rgba(139, 127, 214, 0.4)' : 'rgba(139, 127, 214, 1)';
  });
}

/**
 * Chart color constants
 */
export const CHART_COLORS = {
  primary: 'rgba(139, 127, 214, 1)',
  secondary: 'rgba(139, 127, 214, 0.4)',
  border: 'rgba(139, 127, 214, 1)'
};

/**
 * Chart style constants
 */
export const CHART_STYLES = {
  borderWidth: 0,
  borderRadius: 4,
  height: 300
};
