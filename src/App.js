import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Day from "./Day";
function App() {
  const [week, setWeek] = React.useState(["일", "월", "화", "수", "목", "금", "토"]);
  
  
  return (
  <div className="App">
      <Container>
        <Switch>
          <Route path ="/" exact>
            <Home week={week}/>
          </Route>
          <Route path ="/day/" exact>
            <Day />
          </Route>
        </Switch>
      </Container>
  </div>
  );
}

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export default App;
