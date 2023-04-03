import { createContext, useEffect, useState, useMemo } from "react";
import {
  LOAD_PLAYER,
  UPDATE_INVENTORY,
  UPDATE_SKILL,
  UPDATE_HEALTH,
  UPDATE_WALLET,
  UPDATE_EQUIPPED,
  UNEQUIP_ITEM,
} from "./Engine";
import { EQUIPMENT, EQUIPMENT_STATS } from "./Defaults";

// Create the userContext for sharing data across components
export const userContext = createContext();

// Define the UserContext component
const UserContext = ({ children }) => {
  // State for the current skill and player data
  const [currentSkill, setCurrentSkill] = useState(false);
  const [player, setPlayer] = useState(false);
  const [playerDead, setPlayerDead] = useState(false);

  // Effect to store player data in localStorage when it updates
  useEffect(() => {
    if (!player) return;
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  // Effect to initialize the player data when the component mounts
  useEffect(() => {
    const initializePlayer = async () => {
      const loadedPlayer = await LOAD_PLAYER();
      setPlayer(loadedPlayer);
    };

    initializePlayer();
  }, []);

  // useMemo to memoize context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
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
      UNEQUIP_ITEM,
      EQUIPMENT,
      EQUIPMENT_STATS,
    }),
    [currentSkill, player, playerDead]
  );

  // Render the userContext.Provider with the current skill and player data
  return (
    <userContext.Provider value={contextValue}>
      {/* Display loading text while player data is being fetched */}
      {!player && <>LOADING</>}
      {/* Render children components when player data is available and player is not dead */}
      {player && !playerDead && children}
      {/* Display "YOU DIED" message and revive button when player is dead */}
      {player && playerDead && (
        <>
          YOU DIED. <br />
          <button
            onClick={() => {
              setPlayerDead(false);
              setPlayer({ ...player, health: player.max_health });
            }}
          >
            Revive
          </button>
        </>
      )}
    </userContext.Provider>
  );
};

export default UserContext;
