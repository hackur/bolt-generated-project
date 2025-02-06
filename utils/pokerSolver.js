export function calculateOdds(userHand, opponentHand) {
  const outcomes = ['Win', 'Lose', 'Tie'];
  const odds = {};

  // Simple random distribution for demonstration purposes
  outcomes.forEach(outcome => {
    odds[outcome] = Math.random();
  });

  // Normalize the odds to sum up to 1
  const totalOdds = Object.values(odds).reduce((sum, value) => sum + value, 0);
  Object.keys(odds).forEach(key => {
    odds[key] /= totalOdds;
  });

  return odds;
}
