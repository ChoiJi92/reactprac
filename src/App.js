import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Day from "./Day";
import { useDispatch, useSelector } from "react-redux";
import { loadScoreFB } from "./redux/modules/score";
function App() {
  // const week = ["일", "월", "화", "수", "목", "금", "토"];
  // const day = new Date().getDay();
  // const realweek = week.map((v, i) => (v = week[(day + i) % 7])); // 오늘을 기준으로 요일을 다시 셋팅

  const dispatch = useDispatch();
  React.useEffect(async () => {
      dispatch(loadScoreFB());
  }, []);
  
  
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route path="/" exact>
            <Home  />
            {/* Home에 realweek를 props로 넘겨줌 */}
          </Route>
          {/* /day/뒤에 요일을 붙여주기위해 :week를 붙여줌 */}
          <Route path="/day/:week" exact>
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
