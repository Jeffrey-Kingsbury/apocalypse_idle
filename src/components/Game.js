import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { userContext } from "../UserContext";

const Game = () => {

  return (
    <Wrapper></Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background-color: aliceblue;
`;

const ItemContainer = styled.div`
  text-transform: capitalize;
  user-select: none;
`;
export default Game;
