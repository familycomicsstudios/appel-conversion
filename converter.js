// Linear interpolation
function linearInterpolation(x0, y0, x1, y1, x) {
  if (x1 === x0) return y0;
  return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
}

// Conversion tables
const michaelChanTable = [
  [0.1, 0.1], [1, 1], [2, 1.5], [3, 2], [4, 3], [8, 4],
  [10, 5], [20, 7], [30, 8], [40, 9], [50, 10],
  [60, 11], [80, 12], [100, 13], [200, 15]
];

const scheepTable = [
  [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2.5], [5, 3],
  [6, 3.25], [7, 3.5], [7.5, 4], [8, 5], [9, 7], [10, 8],
  [11, 9], [12, 10], [13, 11], [14, 12], [14.5, 13], [15, 15]
];

const scheepVisuals = [
  [0, "Baby"], [1, "Easy"], [2, "Medium"], [3, "Hard"], [3.5, "Harder"],
  [4, "Difficult"], [5, "Intense"], [6, "Remorseless"], [7, "Insane"], 
  [7.5, "Insane EX"], [8, "Madness"], [9, "Extreme"], [10, "Xtreme"], 
  [11, "???????"], [12, "Impossible"], [13, "Ascended"], [14, "TAS"], [15, "Cwktao's Wrath"]
];

// Generic functions
function toPunter(value, table) {
  for (let i = 0; i < table.length - 1; i++) {
    const [x0, y0] = table[i];
    const [x1, y1] = table[i + 1];
    if (value >= x0 && value <= x1) return linearInterpolation(x0, y0, x1, y1, value);
  }
  return value < table[0][0] ? table[0][1] : table[table.length - 1][1];
}

function fromPunter(value, table) {
  for (let i = 0; i < table.length - 1; i++) {
    const [x0, y0] = table[i];
    const [x1, y1] = table[i + 1];
    if (value >= y0 && value <= y1) return linearInterpolation(y0, x0, y1, x1, value);
  }
  return value < table[0][1] ? table[0][0] : table[table.length - 1][0];
}

// Format number to only needed decimals
function formatNumber(num) {
  return parseFloat(num.toFixed(10)).toString();
}

// Convert value to visual representation
function toVisual(value, system) {
  switch(system) {
    case 'michaelchan':
      if (value < 1) return `${formatNumber(value/10)}⚡`;
      if (value < 10) return `${formatNumber(value)}💥`;
      if (value < 100) return `${formatNumber(value/10)}💣`;
      return `${formatNumber(value/100)}🧨`;
    case 'scheep':
      for (let i = scheepVisuals.length - 1; i >= 0; i--) {
        if (value >= scheepVisuals[i][0]) return scheepVisuals[i][1];
      }
      return scheepVisuals[0][1];
    default:
      return formatNumber(value);
  }
}

// Main conversion
function convert(value, fromSystem, toSystem) {
  if (fromSystem === toSystem) return value;

  let punterValue;
  switch (fromSystem) {
    case 'punter': punterValue = value; break;
    case 'michaelchan': punterValue = toPunter(value, michaelChanTable); break;
    case 'scheep': punterValue = toPunter(value, scheepTable); break;
  }

  switch (toSystem) {
    case 'punter': return punterValue;
    case 'michaelchan': return fromPunter(punterValue, michaelChanTable);
    case 'scheep': return fromPunter(punterValue, scheepTable);
  }
}

// Real-time conversion
function updateConversion() {
  const value = parseFloat(document.getElementById('valueInput').value);
  const fromSystem = document.getElementById('sourceSystem').value;
  const toSystem = document.getElementById('targetSystem').value;

  if (isNaN(value)) {
    document.getElementById('result').textContent = "-";
    document.getElementById('visualResult').textContent = "-";
    return;
  }

  const result = convert(value, fromSystem, toSystem);
  const visual = toVisual(result, toSystem);

  document.getElementById('result').textContent = formatNumber(result);
  document.getElementById('visualResult').textContent = visual;
}

// Event listeners for live update
document.getElementById('valueInput').addEventListener('input', updateConversion);
document.getElementById('sourceSystem').addEventListener('change', updateConversion);
document.getElementById('targetSystem').addEventListener('change', updateConversion);
