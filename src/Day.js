import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Day = (props) => {
    React.useEffect(()=>{
      
    },[])
    return(
        <div>
            <p></p>
            <Weekend></Weekend>
        </div>
    )
}
const Weekend = styled.div`
  margin: auto;
  width: 50px;
  height: 50px;
  background-color: lightgray;
  border-radius: 250px;
`;
export default Day