const display = document.getElementById('display');
const buttons = document.getElementById('buttons');
const history = document.querySelector('.history');

let firstNum ='';
let secondNum = '';
let result = '';
let operator = 0;
let state = 0;
    buttons.addEventListener('click',(e) => {
        if(!e.target.matches("button")) return;
        buttonValue = e.target.textContent;
        clear();
        switch(state){
        case 0:
            if(!firstNum === ''){
                history.textContent = firstNum;
            }
            if(isFinite(buttonValue)){
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
                if(firstNum === ''){return;}
                operator = buttonValue;
                history.textContent += buttonValue;
                display.value = ''; 
                state =1;
            }
            break;
        case 1:
            if(isFinite(buttonValue)){
                display.value += buttonValue;
                secondNum = display.value;
                history.textContent += buttonValue;
                console.log(state);
            }
            else if(buttonValue === "."){
                if(secondNum ===''){return;}
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
                    console.log(result);
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
            console.log(state);
            console.log(operator);
            if(!isFinite(buttonValue)){
                return;
            }
            /*else if(buttonValue === "="){
                if(!result ===''){
                console.log(firstNum);
                secondNum = firstNum;
                result = secondNum;
                display.value += operate(operator,firstNum,secondNum);
                }

            }*/
           else if(isFinite(buttonValue)){
            history.textContent ='';
            display.value = '';
            display.value += buttonValue;
            history.textContent += display.value;
            state = 0;
           }
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
    function clear(){
        if(buttonValue === "C"){
            state =0;
            display.value ='';
            firstNum = '';
            history.textContent = '';
        }
    }
display.value='';
