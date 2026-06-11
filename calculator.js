const display = document.getElementById('display');
const buttons = document.getElementById('buttons');
const history = document.querySelector('.history');

let firstNum =0;
let secondNum = 0;
let operator = 0;
let state = 0;
    buttons.addEventListener('click',(e) => {
        buttonValue = e.target.textContent;
        switch(state){
        case 0:
            if(isFinite(buttonValue)){
            display.value += buttonValue;
            firstNum = display.value;
            
            history.textContent += buttonValue;
            }
            else if(buttonValue === "."){
                if(!display.value.includes(".")){
                    history.textContent += buttonValue;
                    display.value += ".";
                }
            }
            else if(buttonValue === "="){
                return;
            }
            else if(!isFinite(buttonValue)){
            state =1;
            operator = buttonValue;
            history.textContent += buttonValue;
            display.value = ''; 
            return;
            }
            break;
        case 1:
            console.log(state);
            if(isFinite(buttonValue)){
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
                display.value = operate(operator,firstNum,secondNum);
                history.textContent += buttonValue;
                history.textContent += display.value;
            }
            else if(!isFinite(buttonValue)){
                return;
            }
            console.log(operator); 
            console.log(firstNum);
            console.log(secondNum);
            break;
        }
    });
    
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
display.value='';
