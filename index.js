const display = document.querySelector(".display-txt");
const operator = document.querySelectorAll(".operator");
const item = document.querySelectorAll(".item");
const equals = document.querySelector(".equals");
const decimalPt = document.querySelector(".decimal-pt");
const clearAll = document.querySelector(".clear");
const backspace=document.querySelector(".backspace");
const percentage=document.querySelector(".percent");
const signToggle=document.querySelector(".toggle-sign");
let firstNumber = null;
let choosenOperator = null;
let secondNumber = null;

item.forEach(num => {
    num.addEventListener("click", () => {
        numberDisplay(num.textContent);
    })
})

operator.forEach(ope => {
    ope.addEventListener("click", () => {
        
        operation(ope.textContent);
    })
});

clearAll.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = null;
    secondNumber = null;
    choosenOperator = null;
})

equals.addEventListener("click", () => {
   

    calculator();

})
backspace.addEventListener("click",()=>{
  
    if (display.textContent.at(-1)===" "){ 
        
         display.textContent=display.textContent.slice(0,-3);   
    }
    else
    {
         display.textContent=display.textContent.slice(0,-1);
    }
    if(display.textContent===""){
        display.textContent="0";
    }
    if(choosenOperator!==null && display.textContent.includes(` ${choosenOperator} `))
     {
        const numbers = display.textContent.split(` ${choosenOperator} `);
        secondNumber = numbers[1];
        
     }
     else{
        choosenOperator=null;
        secondNumber=null;
     }
     if(!display.textContent.includes(".") || (secondNumber && !secondNumber.includes("."))){
        decimalPt.disabled=false;
     }
   


})
signToggle.addEventListener("click",()=>{
      if(choosenOperator!==null){
        if(!secondNumber){
            return;
        }
        else{
        const parts=display.textContent.split(` ${choosenOperator} `);
        let num2=parseFloat(parts[1])*-1;
        secondNumber=num2.toString();
        display.textContent=`${parts[0]} ${choosenOperator} (${secondNumber})`;
         decimalPt.disabled = display.textContent.includes(".");
      

        }
    }
    else{
        let signHolder=parseFloat(display.textContent);
        if(!isNaN(signHolder)){
        display.textContent=`${signHolder*-1}`;
         decimalPt.disabled = display.textContent.includes(".");
        }
    

}});
percentage.addEventListener("click",()=>{
    if (choosenOperator !== null) {
        if (!secondNumber)
            {
               return;
            } 
        
        const parts = display.textContent.split(` ${choosenOperator} `);
        let num2 = parseFloat(parts[1]) / 100;
        
        secondNumber = num2.toString();
        display.textContent = `${parts[0]} ${choosenOperator} ${secondNumber}`;
         decimalPt.disabled = display.textContent.includes(".");
    } else {
        let num = parseFloat(display.textContent);
        if (!isNaN(num)) {
            display.textContent = `${num / 100}`; 
             decimalPt.disabled = display.textContent.includes(".");
        }
}});

document.addEventListener("keydown", (event) => {
    let key = event.key;

    if ("0123456789".includes(key)) {
        numberDisplay(key);
    }
    else if (key === "+" || key === "-") {
        operation(key);
    }
    else if (key === "*") {
        operation("x");
    }
    else if (key === "/") {
        operation("÷")
    }
    else if (key === "Enter") {
        equals.click();
    }
    else if (key === "Escape") {
        display.textContent = "0";
        firstNumber = null;
        secondNumber = null;
        choosenOperator = null;

    }
    else if (key === ".") {
        if (!decimalPt.disabled) {
            numberDisplay(".");
        }
    }
    else if (key==="Backspace"){
        
                  backspace.click();
            }
         
    else if(key==="Tab"){
          signToggle.click();
    }
    else if(key==="%"){
        percentage.click();
    }
})
function operation(operator) {
    
    
    if(choosenOperator===null){  
        firstNumber = display.textContent;
    } 
    else {
        if(!secondNumber){
            display.textContent=display.textContent.slice(0,-3);
        }
        else{
                calculator();
        firstNumber=display.textContent;
        }
        }
        decimalPt.disabled = false;
        choosenOperator = operator;
        display.textContent += ` ${choosenOperator} `;
    }

  
   



function numberDisplay(number) {
  

    if (display.textContent === "0") {

        display.textContent = number;
    }
    else {

        display.textContent += number;
    }
    if (choosenOperator !== null) {
        const numbers = display.textContent.split(` ${choosenOperator} `);
        secondNumber = numbers[1];

    }
    if (choosenOperator === null) {
        if (display.textContent.includes(".")) {
            decimalPt.disabled = true;
        }

    }
    else {
        if (secondNumber && secondNumber.includes(".")) {
            decimalPt.disabled = true;
        }
    }

}
function calculator() {
    let num1 = parseFloat(firstNumber);
   let num2 = parseFloat(secondNumber.replace(/[()]/g, ""));
    let result=0;

    switch (choosenOperator) {
        case "+":
            result = num1 + num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "÷":
            if (num2 === 0) {
                result = "Error!"
            }
            else { result = num1 / num2; }

            break;
        default:
            console.log("unknown error");


    }
    
    
    display.textContent = result; 
    firstNumber = null;
    secondNumber = null;
    choosenOperator = null;
 

}

