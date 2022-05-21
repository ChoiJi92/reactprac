import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const week = props.week;
  const history = useHistory();
  const [circle, setCircle] = React.useState([0, 1, 2, 3, 4]);
  

  return (
    <>
      <Title>내 일주일은?</Title>
      <Line />
      {week.map((v, i) => {
        const number = parseInt(Math.random() * 6);
        return (
          <>
            <Container>
              <p key={i}>{v}</p>
              {circle.map((value, index) => {
                const color = value <= number ? "yellow" : "lightgray";
                return <Circle color={color} key={index}></Circle>;
              })}
              <Triangle
                onClick={() => history.push(`/day/${v}`)}
                key={i + 1}
              ></Triangle>
            </Container>
          </>
        );
      })}
      <Point>
        <div>평균 평점</div>
        <div>3.6</div>
        <button>Reset</button>
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
  background-color: ${(props) =>
    props.color === "yellow" ? "yellow" : "lightgray"};
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
