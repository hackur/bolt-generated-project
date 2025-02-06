export const CARD_RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export const generateHandId = (rank1, rank2, isSuited) => {
  return `${rank1}${rank2}${isSuited ? 's' : 'o'}`;
};

export const ACTION_TYPES = {
  VALUE_BET: '4-bet for Value',
  BLUFF: '4-bet as a Bluff',
  CALL: 'Call',
  FOLD: 'Fold'
};

export const ACTION_COLORS = {
  [ACTION_TYPES.VALUE_BET]: '#ff4d4d',
  [ACTION_TYPES.BLUFF]: '#4d4dff',
  [ACTION_TYPES.CALL]: '#4caf50',
  [ACTION_TYPES.FOLD]: '#e0e0e0'
};
