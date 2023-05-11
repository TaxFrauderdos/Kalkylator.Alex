/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen
let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner
    
    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);

    } else { // Inte en siffertangent, övriga tangenter.
        switch(btn){
            case "add":
                setOperator("+");
                break;
            case "sub":
                setOperator("-");
                break;
            case "mul":
                setOperator("x");
                break;
            case "div":
                setOperator("/");
                break;
            case "comma":
                addComma();
                break;
            case "clear": {
                if(lcd.value === ""){
                    memClear();
                    alert("Text Cleared")
                    break;
                }
                clearLCD();
                break;
            }
            
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (lcd.value.includes("."))
    return;
    lcd.value += ".";
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    if(arithmetic){
        calculate();
    }
    else{
        memory =parseFloat(lcd.value);
    }
    clearLCD();
    arithmetic = operator;
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    if(!arithmetic){
        return;
    }
    let value = parseFloat;
    switch(arithmetic){
        case "add":
            memory += value;
            break;
        case "sub":
            memory -= value;
            break;
        case "mul":
            memory *= value;
            break;
        case "div":
            memory /= value;
            break;
        default:
            break;
    }
    lcd.value = memory.toString();
    arithmetic = null;
}

/** Rensar display */
function clearLCD() {
    lcd.value = "";
    isComma = false;
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
