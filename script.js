const expDiv = document.getElementById("exp");
const resDiv = document.getElementById("res");
const themeToggle = document.querySelector(".theme-toggle");

let expression = "";

function input(value) {
  navigator.vibrate?.(50);
  const lastNumMatch = expression.match(/(\d+\.?\d*)$/);
  const lastNum = lastNumMatch ? lastNumMatch[0] : "";

  if (lastNum === "0" && ![".", "+", "-", "*", "/", "%"].includes(value)) {
    expression = expression.slice(0, -1) + value;
  } else {
    expression += value;
  }

  expDiv.innerText = expression;
  expDiv.classList.remove("small"); // ekspresi tetap besar
  resDiv.innerText = ""; // reset hasil saat input
}

function clearDisplay() {
  navigator.vibrate?.(50);
  expression = "";
  expDiv.innerText = "0";
  expDiv.classList.remove("small");
  resDiv.innerText = "";
}

function deleteLast() {
  navigator.vibrate?.(50);
  expression = expression.slice(0, -1);
  expDiv.innerText = expression || "0";
}

function calculate() {
  navigator.vibrate?.(50);
  try {
    const sanitized = expression.replace(/\b0+(\d+)/g, "$1"); // hilangkan nol di depan angka (bukan desimal)
    const result = eval(sanitized);
    resDiv.innerText = result;
    expression = result.toString();
    expDiv.classList.add("small"); // kecilkan ekspresi
  } catch {
    resDiv.innerText = "Error";
    expression = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", ".", "%"].includes(e.key)
  ) {
    input(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.innerText = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

document.getElementById("copy-btn").addEventListener("click", copyResult);
function copyResult() {
  const resultText = resDiv.innerText;
  navigator.clipboard
    .writeText(resultText)
    .then(() => alert("Hasil disalin!"))
    .catch((err) => alert("Gagal menyalin!"));
}
