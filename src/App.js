import React, { useState } from "react";

import Container from "./components/Container";
import History from "./components/History";
import Screen from "./components/Screen";
import ButtonContainer from "./components/ButtonContainer";
import Button from "./components/Button";

function App() {

  const [history, setHistory] = useState([]);
  const [value, setValue] = useState(0);
  const buttonValues = ["C", "+/-", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  const buttonStyles = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "buttonZero", "", "" ];

  return (
    <Container>
      <History value={history}/>
      <Screen value={value}/>  
      <ButtonContainer>
      { buttonValues.map((e, i) => {
          return (
            <Button className={"button " + buttonStyles[i]} key={i} value={e} />
          )
        })}
      </ButtonContainer>
    </Container>
  );
}

export default App;