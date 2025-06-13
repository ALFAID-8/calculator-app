//calculator program
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const history = document.getElementById("history");

let currentInput = "";
let calcHistory = [];

function updateDisplay() {
    display.textContent = currentInput || "0";
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const val = button.textContent;

        if (button.id === "clear") {
            currentInput = "";
        } else if (button.id === "backspace") {
            currentInput = currentInput.slice(0, -1);
        } else if (button.id === "equal") {
            try {
                const expression = currentInput.replace(/x/g, "*").replace(/÷/g, "/");
                const result = eval(expression);
                calcHistory.unshift(`${currentInput} = ${result}`);
                history.innerHTML = calcHistory.slice(0, 5).map(e => `<div>${e}</div>`).join('');
                currentInput = result.toString();
            } catch {
                currentInput = "Error";
            }
        } else {
            currentInput += val;
        }

        updateDisplay();
    });
});
//optional keybord support  logic 
document.addEventListener("keydown", (e) => {
    const keyMap = {
        "*": "x", "/": "÷", "Enter": "=", "Backspace": "←", "Escape": "C"
    };
    let key = e.key;
    if (keyMap[key]) key = keyMap[key];
    const button = Array.from(buttons).find(b => b.textContent === key || b.id === key.toLowerCase());
    if (button) button.click();
});

