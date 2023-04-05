import { useContext } from "react";
import styled from "styled-components";
import { userContext } from "../UserContext";
import PlayerContainer from "./PlayerContainer";

const Game = () => {
  const {
    currentSkill,
    setCurrentSkill,
    player,
    setPlayer,
    playerDead,
    setPlayerDead,
    UPDATE_INVENTORY,
    UPDATE_SKILL,
    UPDATE_HEALTH,
    UPDATE_WALLET,
    UPDATE_EQUIPPED
  } = useContext(userContext);



  return (
    <Wrapper>
      <button onClick={() => UPDATE_EQUIPPED('stick', player, setPlayer)}>Equip a stick</button>
      <PlayerContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
  user-select: none;
`;

const ItemContainer = styled.div`
  text-transform: capitalize;
  user-select: none;
`;

export default Game;
