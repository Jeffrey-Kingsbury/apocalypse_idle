import { useContext } from "react";
import styled from "styled-components";
import { userContext } from "../UserContext";

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
    UPDATE_EQUIPPED,
    EQUIPMENT,
    EQUIPMENT_STATS,
  } = useContext(userContext);

  const {
    skills: { cooking },
  } = player;

  const handleButtonClick = () => {
    UPDATE_SKILL("cooking", 50, player, setPlayer);
    UPDATE_INVENTORY("scrap metal", 1, player, setPlayer);
    UPDATE_EQUIPPED(EQUIPMENT_STATS["stick"], player, setPlayer);
    UPDATE_HEALTH(-10, player, setPlayer, setPlayerDead);
  };

  return (
    <Wrapper>
      {cooking.xp > 0 && cooking.xp}
      <button onClick={handleButtonClick}>click me</button>
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
`;

const ItemContainer = styled.div`
  text-transform: capitalize;
  user-select: none;
`;

export default Game;
