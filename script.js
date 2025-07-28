const expDiv = document.getElementById("exp");
const resDiv = document.getElementById("res");
const themeToggle = document.querySelector(".theme-toggle");

let expression = "";

function input(value) {
  expression += value;
  expDiv.innerText = expression;
  expDiv.classList.remove("small"); // ⬅️ input tetap normal
  resDiv.innerText = ""; // Hapus hasil
}

function clearDisplay() {
  expression = "";
  expDiv.innerText = "0";
  expDiv.classList.remove("small"); // Reset ukuran ekspresi
  resDiv.innerText = "";
}

function deleteLast() {
  expression = expression.slice(0, -1);
  expDiv.innerText = expression || "0";
}

function calculate() {
  try {
    let result = eval(expression);

    expDiv.innerText = expression + " =";
    expDiv.classList.add("small"); // ⬅️ ekspresi diperkecil
    resDiv.innerText = result; // ⬅️ hasil besar & menonjol
    expression = result.toString(); // Tetap bisa dihitung ulang
  } catch {
    expDiv.innerText = "Error";
    resDiv.innerText = "";
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
  const resultText = document.getElementById("res").innerText;
  navigator.clipboard
    .writeText(resultText)
    .then(() => alert("Hasil disalin!"))
    .catch((err) => alert("Gagal menyalin!"));
}
