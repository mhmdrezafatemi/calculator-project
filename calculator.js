const display = document.getElementById('display');
const buttons = document.getElementById('buttons');
const history = document.querySelector('.history');

let firstNum ='';
let secondNum = '';
let result = '';
let operator = 0;
let state = 0;
const maxDigit = 10;

    buttons.addEventListener('click',(e) => { 
        if(!e.target.matches("button")) return;
        buttonValue = e.target.textContent;
        calculator(e)
    });
    display.addEventListener('keydown',(e)=>{
        buttonValue = e.key;
        if(buttonValue === "Backspace"){
            buttonValue = "B";
        }
        e.preventDefault();
        calculator(e)
    });
    
    
    function calculator(e){
        switch(state){
            case 0:
                console.log(state);
            clear();
            backSpace();
            if(!firstNum === ''){
                history.textContent = firstNum;
            }
            if(isFinite(buttonValue)){
                if(display.value.length > maxDigit){
                    return;
                }
                if(buttonValue === '0' && display.value === '0'){
                    return;
                }
                display.value += buttonValue;
                firstNum = display.value;
                history.textContent += buttonValue;
            }
            else if(buttonValue === "."){
                if(firstNum === ''){return;}
                if(!display.value.includes(".")){
                    history.textContent += buttonValue;
                    display.value += ".";
                }
            }
            else if(buttonValue === "="){
                return;
            }
            else if(!isFinite(buttonValue)){
                if(buttonValue === "B"){return backSpace;}
                if(firstNum === ''){return;}
                operator = buttonValue;
                history.textContent += buttonValue;
                display.value = ''; 
                state =1;
            }
            break;
        case 1:
            clear();
            backSpace();
            console.log(state);
            if(isFinite(buttonValue)){
                if(display.value.length > maxDigit){
                    return;
                }
                if(buttonValue === '0' && display.value === '0'){
                    return;
                }
                display.value += buttonValue;
                secondNum = display.value;
                history.textContent += buttonValue;
            }
            else if(buttonValue === "."){
                    if(!display.value.includes(".")){
                    history.textContent += buttonValue;
                    display.value += ".";
                    }
            }
            else if(buttonValue === "="){
                if(secondNum === ''){return;}
                if(!history.textContent.includes("=")){
                    display.value = operate(operator,firstNum,secondNum);
                    result = display.value;
                    history.textContent += buttonValue;
                    history.textContent += display.value;
                    state = 2;
                }
                else if(history.textContent.includes("=")){
                    if(result === ""){return;}
                    display.value = '';
                    display.value = operate(operator,secondNum,result);
                    history.textContent = result;
                    history.textContent += display.value;
                    state = 0;
                }
            }
            else if(!isFinite(buttonValue)){
            return;
            }
            break;
        case 2:
            clear();
            backSpace();
            console.log(state);
            if(buttonValue === "="){
                display.value = '';
                history.textContent = '';
                display.value += operate(operator,result,secondNum);
                history.textContent = result + operator + secondNum + '=' +display.value;
                result = display.value;
            }
            else if(!isFinite(buttonValue)){
                return;
            }
            else if(isFinite(buttonValue)){
            history.textContent ='';
            display.value = '';
            display.value += buttonValue;
            history.textContent += display.value;
            state = 0;
            }
            break;
        }
    };

    function operate(op,fn,sn){
        num1 = parseFloat(fn);
        num2 = parseFloat(sn);
        if(op == "+"){
            return num1 +num2;
        }
        else if( op == "-"){
            return num1 - num2;
        }
        else if( op == "×"){
            return num1 * num2;
        }
        else if( op == "÷"){
            return num1 / num2;
        }
    }
    function clear(){
        if(buttonValue === "C"){
            state =0;
            display.value ='';
            firstNum = '';
            history.textContent = '';
        }
    }
    function backSpace(){
        if(buttonValue === "B"){
            display.value = display.value.slice(0,-1);
            history.textContent = history.textContent.slice(0,-1);
            if(history.textContent === "="){
                state =2;
            }
            state =0;
        }
    }
display.value='';
