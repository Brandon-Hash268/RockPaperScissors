function calculateResult(move1,move2) {
   if (move1 === move2) return "It's a tie!";
   if (
     (move1 === "rock" && move2 === "scissors") ||
     (move1 === "scissors" && move2 === "paper") ||
     (move1 === "paper" && move2 === "rock")
   ) {
     return "Player 1 wins!";
   }
   return "Player 2 wins!";
}

module.exports = calculateResult