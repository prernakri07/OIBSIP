const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const equalsButton = document.getElementById("equals");
let expression = "";
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.getAttribute("data-value");
        if (value === null) {
            return;
        }
        if (display.value === "Error") {
            expression = "";
        }
        if (value === ".") {
            const numbers = expression.split(/[+\-*/%]/);
            const currentNumber = numbers[numbers.length - 1];
            if (currentNumber.includes(".")) {
                return;
            }
        }
        if (isOperator(value)) {
            if (expression === "") {
                return;
            }
            const lastCharacter =
               expression[expression.length - 1];
            if (isOperator(lastCharacter)) {
                expression = expression.slice(0, -1) + value;
            } else {
                expression += value;
            }
        } else {
           expression += value;
        }
  display.value = expression;
    });
});
clearButton.addEventListener("click", function () {
    expression = "";
    display.value = "0";
});
backspaceButton.addEventListener("click", function () {
    if (display.value === "Error") {
        expression = "";
        display.value = "0";
        return;
    }
    expression = expression.slice(0, -1);
   if (expression === "") {
        display.value = "0";
    } else {
        display.value = expression;
    }
});
equalsButton.addEventListener("click", function () {
    if (expression === "") {
        return;
    }
    const lastCharacter = expression[expression.length - 1];
    if (isOperator(lastCharacter)) {
        display.value = "Complete the expression";
        return;
    }
    try {
        const result = calculateExpression(expression);
        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }
         display.value = formatResult(result);
        expression = formatResult(result);
    }
    catch (error) {
        display.value = "Error";
        expression = "";
    }
});
function isOperator(value) {
    return (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/" ||
        value === "%"
    );
}
function calculateExpression(expression) {
    const tokens = expression.match(/\d+\.?\d*|[+\-*/%]/g);
    if (!tokens) {
        throw new Error("Invalid expression");
    }
    let values = [...tokens];
    for (let i = 0; i < values.length; i++) {
        if (
            values[i] === "*" ||
            values[i] === "/" ||
            values[i] === "%"
        ) {
            const left = parseFloat(values[i - 1]);
            const right = parseFloat(values[i + 1]);
            if (isNaN(left) || isNaN(right)) {
                throw new Error("Invalid expression");
            }
            let result;
            if (values[i] === "*") {
                result = left * right;
            }
            else if (values[i] === "/") {
                if (right === 0) {
                    throw new Error("Cannot divide by zero");
                }
                result = left / right;
            }
            else if (values[i] === "%") {
                if (right === 0) {
                    throw new Error("Cannot divide by zero");
                }
                result = left % right;
            }
            values.splice(
                i - 1,
                3,
                result.toString()
            );
            i = -1;
        }
    }
    let result = parseFloat(values[0]);
    if (isNaN(result)) {
        throw new Error("Invalid expression");
    }
    for (let i = 1; i < values.length; i += 2) {
        const operator = values[i];
        const number = parseFloat(values[i + 1]);
        if (isNaN(number)) {
            throw new Error("Invalid expression");
        }
        if (operator === "+") {
            result += number;
        }
        else if (operator === "-") {
            result -= number;
        }
        else {
            throw new Error("Invalid operator");
        }
    }
    return result;
}
function formatResult(number) {
      if (Object.is(number, -0)) {
        number = 0;
    }
    return parseFloat(
        number.toFixed(10)
    ).toString();
}