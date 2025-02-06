<template>
  <div class="odds-display">
    <h2>Odds</h2>
    <ul>
      <li v-for="(percentage, outcome) in odds" :key="outcome">
        {{ outcome }}: {{ (percentage * 100).toFixed(2) }}%
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    odds: Object
  }
};
</script>

<style scoped>
.odds-display {
  margin-top: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>
