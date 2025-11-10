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

// Punter visual mapping
const punterVisuals = [
  [1, "Easy"], [2, "Medium"], [3, "Hard"], [4, "Harder"], [5, "Insane"],
  [6, "Expert"], [7, "Extreme"], [8, "Madness"], [9, "Master"], [10, "Grandmaster"],
  [11, "Grandmaster+"], [12, "Grandmaster++"], [13, "TAS"], [14, "TAS+"],
  [15, "TAS++"]
  // For 16+ we add logic dynamically
];

// Scheep visual mapping
const scheepVisuals = [
  [0, "Baby"], [1, "Easy"], [2, "Medium"], [3, "Hard"], [3.5, "Harder"],
  [4, "Difficult"], [5, "Intense"], [6, "Remorseless"], [7, "Insane"], 
  [7.5, "Insane EX"], [8, "Madness"], [9, "Extreme"], [10, "Xtreme"], 
  [11, "???????"], [12, "Impossible"], [13, "Ascended"], [14, "TAS"], [15, "Cwktao's Wrath"]
];

// Helper: format number nicely
function formatNumber(num) {
  return parseFloat(num.toFixed(10)).toString();
}

// Linear interpolation to/from punter
function toPunter(value, table) {
  for (let i = 0; i < table.length-1; i++) {
    const [x0, y0] = table[i];
    const [x1, y1] = table[i+1];
    if (value >= x0 && value <= x1) return linearInterpolation(x0, y0, x1, y1, value);
  }
  return value < table[0][0] ? table[0][1] : table[table.length-1][1];
}

function fromPunter(value, table) {
  for (let i = 0; i < table.length-1; i++) {
    const [x0, y0] = table[i];
    const [x1, y1] = table[i+1];
    if (value >= y0 && value <= y1) return linearInterpolation(y0, x0, y1, x1, value);
  }
  return value < table[0][1] ? table[0][0] : table[table.length-1][0];
}

// Convert numeric value to visual for a system
function toVisual(value, system) {
  switch(system) {
    case 'punter':
      if (value >= 16) return `TAS++${Math.floor(value-15) > 0 ? `+${Math.floor(value-15)}` : ''}`;
      for (let i = punterVisuals.length-1; i >=0; i--) {
        if (value >= punterVisuals[i][0]) return punterVisuals[i][1];
      }
      return formatNumber(value);
    case 'michaelchan':
      if (value < 1) return `${formatNumber(value*10)}⚡`;
      if (value < 10) return `${formatNumber(value)}💥`;
      if (value < 100) return `${formatNumber(value/10)}💣`;
      return `${formatNumber(value/100)}🧨`;
    case 'scheep':
      for (let i = scheepVisuals.length-1; i >= 0; i--) {
        if (value >= scheepVisuals[i][0]) return scheepVisuals[i][1];
      }
      return formatNumber(value);
    default:
      return formatNumber(value);
  }
}

// Parse visual input to numeric for a system
function visualToNumber(text, system) {
  text = text.trim();
  switch(system) {
    case 'punter':
      // Check + pattern for 16+
      if (/TAS\+\+/.test(text)) {
        const extra = parseInt(text.split('+')[2]||0);
        return 15 + extra;
      }
      for (let [val,name] of punterVisuals) if (name.toLowerCase() === text.toLowerCase()) return val;
      return parseFloat(text);
    case 'michaelchan':
      // Normalize letters to emojis
      text = text.toLowerCase()
                .replace(/z/g,'⚡')
                .replace(/e/g,'💥')
                .replace(/b/g,'💣')
                .replace(/d/g,'🧨');

      // Count emojis if no number is present
      if (/^[⚡💥💣🧨]+$/.test(text)) {
        let total = 0;
        for (let char of text) {
          if (char === '⚡') total += 0.1;    // ⚡ = 0.1
          if (char === '💥') total += 1;    // 💥 = 1
          if (char === '💣') total += 10;   // 💣 = 10
          if (char === '🧨') total += 100;  // 🧨 = 100
        }
        return total;
      }

      if (text.endsWith('⚡')) return parseFloat(text.replace('⚡',''))*0.1;
      if (text.endsWith('💥')) return parseFloat(text.replace('💥',''))*1;
      if (text.endsWith('💣')) return parseFloat(text.replace('💣',''))*10;
      if (text.endsWith('🧨')) return parseFloat(text.replace('🧨',''))*100;
      return parseFloat(text);


    case 'scheep':
      for (let [val,name] of scheepVisuals) if (name.toLowerCase() === text.toLowerCase()) return val;
      return parseFloat(text);
    default:
      return parseFloat(text);
  }
}

// Convert from any system to any other system
function convert(value, fromSystem, toSystem) {
  let numericValue;
  if (typeof value === 'string') numericValue = visualToNumber(value, fromSystem);
  else numericValue = value;

  if (fromSystem === toSystem) return numericValue;

  // Convert to Punter first
  let punterValue;
  switch(fromSystem) {
    case 'punter': punterValue = numericValue; break;
    case 'michaelchan': punterValue = toPunter(numericValue, michaelChanTable); break;
    case 'scheep': punterValue = toPunter(numericValue, scheepTable); break;
  }

  // Convert from Punter to target
  switch(toSystem) {
    case 'punter': return punterValue;
    case 'michaelchan': return fromPunter(punterValue, michaelChanTable);
    case 'scheep': return fromPunter(punterValue, scheepTable);
  }
}

// Update display in real-time
function updateConversion() {
  const input = document.getElementById('valueInput').value;
  const fromSystem = document.getElementById('sourceSystem').value;
  const toSystem = document.getElementById('targetSystem').value;

  if (!input) {
    document.getElementById('result').textContent = '-';
    document.getElementById('visualResult').textContent = '-';
    return;
  }

  const numericResult = convert(input, fromSystem, toSystem);
  document.getElementById('result').textContent = formatNumber(numericResult);
  document.getElementById('visualResult').textContent = toVisual(numericResult, toSystem);
}

// Event listeners
document.getElementById('valueInput').addEventListener('input', updateConversion);
document.getElementById('sourceSystem').addEventListener('change', updateConversion);
document.getElementById('targetSystem').addEventListener('change', updateConversion);
