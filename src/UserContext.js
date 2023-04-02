import { createContext, useEffect, useState } from "react";
import { LOAD_PLAYER, UPDATE_INVENTORY, UPDATE_SKILL } from "./Engine";

// Create the userContext for sharing data across components
export const userContext = createContext();

// Define the UserContext component
const UserContext = ({ children }) => {
  // State for the current skill and player data
  const [currentSkill, setCurrentSkill] = useState(false);
  const [player, setPlayer] = useState(null);

  // Effect to store player data in localStorage when it updates
  useEffect(() => {
    if (!player) return;
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  // Function to initialize the player data
  const INIT = async () => {
    const loadedPlayer = await LOAD_PLAYER();
    setPlayer(loadedPlayer);
  };

  // Effect to initialize the player data when the component mounts
  useEffect(() => {
    INIT();
  }, []);

  // Render the userContext.Provider with the current skill and player data
  return (
    <userContext.Provider
      value={{ currentSkill, setCurrentSkill, player, setPlayer }}
    >
      {player ? children : <>NOW LOADING</>}
    </userContext.Provider>
  );
};

export default UserContext;
