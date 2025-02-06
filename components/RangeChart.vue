<template>
  <div class="range-chart">
    <h2>Range Chart</h2>
    <div class="grid">
      <div
        v-for="cell in grid"
        :key="cell.id"
        :class="[
          'cell',
          cell.action?.toLowerCase().replace(/\s+/g, '-'),
          { highlighted: isHighlighted(cell) }
        ]"
        @click="toggleHighlight(cell)"
        @mouseover="hoveredCell = cell"
        @mouseleave="hoveredCell = null"
      >
        <span class="cell-text">{{ cell.label }}</span>
        <div v-if="hoveredCell === cell" class="popover">
          <p>Action: {{ cell.action }}</p>
          <p>Percentage: {{ cell.percentage ? cell.percentage + '%' : 'N/A' }}</p>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div
        v-for="(stat, action) in rangeData.statistics"
        :key="action"
        :class="['stat-row', action.toLowerCase().replace(/\s+/g, '-')]"
      >
        <span class="action">{{ action }}</span>
        <span class="percentage">{{ stat.percentage }}%</span>
        <span class="ratio">{{ stat.hands }}/{{ stat.total }}</span>
        <span class="total-percentage">{{ stat.ratio }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { CARD_RANKS, generateHandId, ACTION_TYPES, ACTION_COLORS } from '../utils/constants';
import rangeData from '../data/ranges.json';

export default {
  data() {
    console.log('rangeData', rangeData); // Debugging: Check if rangeData is loaded correctly
    return {
      grid: this.generateGrid(),
      highlightedCells: [],
      rangeData,
      hoveredCell: null
    };
  },
  methods: {
    generateGrid() {
      const grid = [];

      if (!rangeData || !rangeData.openingRanges) {
        console.error('openingRanges is undefined');
        return grid; // or return an empty grid or handle the error appropriately
      }

      CARD_RANKS.forEach((rank1, i) => {
        CARD_RANKS.forEach((rank2, j) => {
          const isSuited = i !== j;
          const id = generateHandId(rank1, rank2, isSuited);
          const label = isSuited ? `${rank1}${rank2}s` : `${rank1}${rank2}`;
          const rangeInfo = rangeData.openingRanges[label] || { action: ACTION_TYPES.FOLD };

          grid.push({
            id,
            label,
            ...rangeInfo,
            percentage: rangeInfo.percentage // Add percentage to cell data
          });
        });
      });

      return grid;
    },
    isHighlighted(cell) {
      return this.highlightedCells.includes(cell.id);
    },
    toggleHighlight(cell) {
      if (this.isHighlighted(cell)) {
        this.highlightedCells = this.highlightedCells.filter(id => id !== cell.id);
      } else {
        this.highlightedCells.push(cell.id);
      }
    }
  }
};
</script>

<style scoped>
.range-chart {
  margin: 20px;
  font-family: Arial, sans-serif;
  position: relative; /* Add relative positioning to the container */
}

.grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 2px;
  margin-bottom: 20px;
}

.cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: bold;
  background-color: #fff;
  transition: all 0.2s;
  position: relative; /* Add relative positioning to the cell */
}

.cell.four-bet-for-value {
  background-color: #ff4d4d;
  color: white;
}

.cell.four-bet-as-a-bluff {
  background-color: #4d4dff;
  color: white;
}

.cell.call {
  background-color: #4caf50;
  color: white;
}

.cell.fold {
  background-color: #e0e0e0;
}

.statistics {
  margin-top: 20px;
}

.stat-row {
  display: flex;
  padding: 8px;
  margin: 2px 0;
  color: white;
  justify-content: space-between;
}

.stat-row.four-bet-for-value {
  background-color: #ff4d4d;
}

.stat-row.four-bet-as-a-bluff {
  background-color: #4d4dff;
}

.stat-row.call {
  background-color: #4caf50;
}

.stat-row.fold {
  background-color: #e0e0e0;
  color: #333;
}

.cell:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.cell-text {
  font-size: 0.9em;
}

.statistics span {
  flex: 1;
  text-align: center;
}

/* Popover Styles */
.popover {
  position: absolute;
  top: -5px; /* Adjust as needed */
  left: 100%; /* Position to the right of the cell */
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
  z-index: 10;
  white-space: nowrap; /* Prevent text from wrapping */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
