import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const Day = (props) => {
  const week_params = useParams();  //페이지 이동할때 넘겨주는 해당 요일을 받아옴
  const circle = [0,1,2,3,4]
  const [number,setNumber] = React.useState(0)  // 초기값을 0으로 줘서 원 색상이 모두 lightgray가 나오게함
  const history = useHistory();
  const clickEvent = (number) => {
      setNumber(number + 1)
  }
  // 키보드 숫자 키 눌렀을 때 원 색깔 바뀜
  React.useEffect(()=>{
    window.addEventListener('keydown', (e) => {
      setNumber(e.key)
    })
    return () => {
      window.removeEventListener('keydown', (e) => {
        setNumber(e.key)
      })
    }
  },[])
  
  return (
    <>
      <Title>
        <span>{week_params.week}요일</span> 평점 남기기
      </Title>
      <Wrap>
        {circle.map((v, i) => {
          return i<number ? (<Circle key={v} style={{backgroundColor:'yellow'}} onClick={() => clickEvent(i)}></Circle>) 
          : (<Circle key={v} onClick={() => clickEvent(i)}></Circle>)
        })}
      </Wrap>
      <Button onClick={() => history.push(`/`)}>평점 남기기</Button>
    </>
  );
};

const Title = styled.h3`
  text-align: center;
  span {
    color: rgb(255, 255, 255);
    font-weight: 900;
    background: orange;
    padding: 0.2rem;
    border-radius: 5px;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.div`
  margin: 10px;
  width: 30px;
  height: 30px;
  background-color: lightgray;
  border-radius: 30px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  background-color: purple;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
`;
export default Day;
