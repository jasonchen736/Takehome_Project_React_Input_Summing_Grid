// base algorithm taken from stack overflow
const abbreviateNumber = (number) => {
  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  // what tier? (determines SI symbol)
  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return number;

  // beyond our range of abbreviations, let's return the original
  // alternatively, can abbreviate with the highest definition
  if (tier >= SI_SYMBOL.length) return number;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // calculate precision
  const leftCount = parseInt(Math.abs(scaled), 10);
  let precision = 0;
  if (leftCount < 10) {
    precision = 2;
  } else if (leftCount < 100) {
    precision = 1;
  }

  // format number and add suffix
  return scaled.toFixed(precision) + suffix;
}

export { abbreviateNumber };
