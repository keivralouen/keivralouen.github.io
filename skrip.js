let currentInput = "0";
const display = document.getElementById("display");

function updateDisplay() {
    display.textContent = currentInput;
}

function appendValue(value) {
    if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else if (currentInput === "Error") {
        currentInput = value;
    } else {
        // Check if an operator is being added after an operator
        const lastChar = currentInput.charAt(currentInput.length - 1);
        const operators = ['+', '-', '*', '/'];

        if (operators.includes(value) && operators.includes(lastChar)) {
            // Replace the last operator
            currentInput = currentInput.slice(0, -1) + value;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    updateDisplay();
}

function calculate() {
    try {
        // Replace the × symbol with * for evaluation
        let expression = currentInput.replace(/×/g, '*');

        const result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            currentInput = "Error";
        } else {
            // Format result to avoid too many decimal places
            currentInput = Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
        }
    } catch (error) {
        currentInput = "Error";
    }
    updateDisplay();
}

// Initialize display
updateDisplay();