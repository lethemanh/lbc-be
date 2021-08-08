const calculateMoneyAfterRoll = (user, bet, coefficient) => {
  // Original player's money + Player's money of Bet + Player's rewards 
  return user.balance + bet.amount + (bet.amount * coefficient);
};

const calculateMoneyAfterBet = (user, betDataOfUser) => {
  // User's balance - user's bet money
  return user.balance - (betDataOfUser.amount);
};

module.exports = {
  calculateMoneyAfterRoll,
  calculateMoneyAfterBet
};
