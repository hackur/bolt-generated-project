<template>
  <div class="container">
    <h1>Poker Odds Calculator</h1>
    <form @submit.prevent="calculateOdds">
      <label for="userHand">Your Hand:</label>
      <input v-model="userHand" type="text" id="userHand" placeholder="e.g., AS KS" />

      <label for="opponentHand">Opponent's Hand:</label>
      <input v-model="opponentHand" type="text" id="opponentHand" placeholder="e.g., 2D 3H" />

      <button type="submit">Calculate Odds</button>
    </form>

    <OddsDisplay :odds="odds" />
    <RangeChart />
  </div>
</template>

<script>
import { calculateOdds } from '~/utils/pokerSolver';
import OddsDisplay from '~/components/OddsDisplay.vue';
import RangeChart from '~/components/RangeChart.vue';

export default {
  components: {
    OddsDisplay,
    RangeChart
  },
  data() {
    return {
      userHand: '',
      opponentHand: '',
      odds: {}
    };
  },
  methods: {
    calculateOdds() {
      this.odds = calculateOdds(this.userHand, this.opponentHand);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input {
  margin-bottom: 10px;
}
button {
  cursor: pointer;
}
</style>
