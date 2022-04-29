import React, { useState, useEffect, useRef } from "react";

import Container from "./components/Container";
import History from "./components/History";
import Screen from "./components/Screen";
import ButtonContainer from "./components/ButtonContainer";
import Button from "./components/Button";

function App() {

  const [history, setHistory] = useState([]);

  const [input, setInput] = useState(0);
  const resetInput = useRef(true);
  const clearData = useRef(false);
  const [decimalPressed, setDescimalPressed] = useState(false);
  const buttonLabels = ["C", "+/-", "%", "÷", 7, 8, 9, "×", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="];
  const buttonStyles = ["buttonFunction", "buttonFunction", "buttonFunction", "buttonOperator", "", "", "", "buttonOperator", "", "", "", "buttonOperator", "", "", "", "buttonOperator", "buttonZero", "", "buttonOperator" ];

  const checkInputType = (input) => {
    if(typeof input == 'number' && !isNaN(input)){
        if (Number.isInteger(input)) { //integer
            return ("int");
        }
        else {
            return ("float");
        }
    } else {
        return ("string");
    }
  }

  const handlePress = (val) => {
    if (clearData.current === true) {
      clearData.current = false;
      clear();
    } else {
      const type = checkInputType(val);

      switch (type) {
        case "int":
          concat(val);
          break;
        case "string":
          func(val);
          break;
        default:
          //
      } 
    }
  }

  const clear = () => {
    setDescimalPressed(false);
    setHistory([]);
    setInput(0);
  }

  const concat = (val) => {
    if (input === 0 || resetInput.current === true) {
      setInput(val);
      resetInput.current = false;
    } else {
      setInput(input +""+ val);
    }
    
  }

  const func = (val) => {
    if (val === "." && decimalPressed === false) {
      concat(val);
      setDescimalPressed(true);
    }
    if (val === "C") {
      clear();
    }
    if (val === "+/-") {
      setInput(parseFloat(input) - (parseFloat(input) * 2));
    }
    if (val === "%") {
      setInput(parseFloat(input) / 100);
    }
    if (val === "÷" || val === "×" || val === "-" || val === "+") {
      saveHistory(val)
      resetInput.current = true;
    }
    if (val === "=") {
      saveHistory(val);
    }
  }

  const saveHistory = (op) => {
    setHistory(oldArray => [...oldArray, parseFloat(input), op]);
  }

  useEffect(() => {
    if(history[history.length - 1] === "=") {
      
      const calc = () => {
        let newArr = history;
    
        function multiplyAndDivide() {
          for (let i = 0; i < newArr.length; i++) {
            if (newArr[i] === "×") {
              let times = newArr[i - 1] * newArr[i + 1];
              newArr[i - 1] = times;
              newArr.splice(i, 2);
            } else if (newArr[i] === "÷") {
              let divide = newArr[i - 1] / newArr[i + 1];
              newArr[i - 1] = divide;
              newArr.splice(i, 2);
            }
          }
        }
    
        while (newArr.includes("×") || newArr.includes("÷")) {
          multiplyAndDivide();
        }
    
        let finalAnswer = 0;
        if (newArr.length === 2){
          finalAnswer = newArr[0];
        }
    
        let firstOperation = true;
        for (let i = 0; i < newArr.length; i++){
          if (newArr[i] === "+") {
            if (firstOperation) {
              firstOperation = false;
              finalAnswer = newArr[i-1] + newArr[i+1];;
            } else {
              finalAnswer += newArr[i+1];
            }
          }
          if (newArr[i] === "-") {
            if (firstOperation) {
              firstOperation = false;
              finalAnswer = newArr[i-1] - newArr[i+1];;
            } else {
              finalAnswer -= newArr[i+1];
            }
          }
        }
        setInput(finalAnswer);
        clearData.current = true;
      }
      calc();
    }
  },[history])

  

  return (
    <Container>
      <History key={"history"} value={history}/>
      <Screen value={input}/>  
      <ButtonContainer>
        {buttonLabels.map((e, i) => {
          return (
            <Button className={"button " + buttonStyles[i]} key={i} value={e} onClick={() => handlePress(e)}/>
          )
        })}
      </ButtonContainer>
    </Container>
  );
}

export default App;