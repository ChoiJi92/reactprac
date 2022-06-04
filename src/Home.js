import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadScoreFB, resetScoreFB } from "./redux/modules/score";


const Home = (props) => {
  const week = props.week;
  const history = useHistory();
  const dispatch = useDispatch();
  
//   React.useEffect(async () => {
//     dispatch(loadScoreFB());
// }, []);
 
  
  const data = useSelector((state) => state.score.score)
  const circle = [0,1,2,3,4]
  const num = data.map(v => v.rate)
  // 랜덤 숫자로 구성된 길이가 7인 배열을 만들어줌
  const a = num.reduce((acc,cur)=>acc+cur,0)/7
  // a는 num배열의 각 원소의 모든 수의 평균
  const [avg, setAvg] = React.useState(a.toFixed(1))
  // avg를 state로 줘서 리셋을누르면 0이되게 함
  React.useEffect(()=>{
    setAvg(a.toFixed(1))
  },[a])
  const resetClick = () => {
    setAvg(0.0)
  }
  const resetRate = () => {
    dispatch(resetScoreFB(0))
  }
  return (
    <>
      <Title>내 일주일은?</Title>
      <Line /> 
      {/* 요일을 다 적어주기위해 props로 받은 week에 map함수를 적용 */}
      {data.map((v, i) => {
          const number = v.rate
        return (
          <>
            <Container>
              <p key={i}>{v.week}</p>
              {circle.map((value, index) => {
                // 랜덤인 수 보다 작거나 같으면 원 색상은 yellow 아니면 lightgray
                return value <  number? (<Circle key={index} style={{backgroundColor:'yellow'}}></Circle>) 
                : (<Circle key={index}></Circle>)
              })}
              <Triangle
              // 요일과 같은 줄에 위치한 삼각형을 누르면 해당 요일의 페이지로 넘어감
                onClick={() => history.push(`/day/${v.week}`)}
                key={i + 1}
              ></Triangle>
            </Container>
          </>
        );
      })
      }
       <Point>
        <div>평균 평점</div>
        <div>{avg}</div>
        <button onClick={resetRate} >Reset</button>
      </Point>
    </>
  );
};

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;
const Circle = styled.div`
  margin: 10px;
  width: 30px;
  height: 30px;
  background-color: lightgray;
  border-radius: 30px;
`;

const Triangle = styled.div`
  appearance: none;
  background-color: transparent;
  border-color: transparent purple;
  width: 0px;
  height: 0px;
  border-top-width: 1rem;
  border-top-style: solid;
  border-bottom-width: 1rem;
  border-bottom-style: solid;
  border-left-width: 1.6rem;
  border-left-style: solid;
  color: rgb(255, 255, 255);
  cursor: pointer;
`;
const Point = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 100%;
  color: blue;
  font-weight: bold;
  font-size:25px;
  margin-top: 10px;
  
  button {
      border-radius: 5px;
      width: 150px;
      height: 50px;
      background-color: blue;
      color: white;
      cursor: pointer;
      font-size: 18px;
      margin-top: 10px;
  }
`;
export default Home;