import UserContext from "./UserContext";
import Game from "./components/Game";
import Engine from "./Engine";

function App() {

  return (
    <UserContext>
      <Game />
    </UserContext>
  );
}

export default App;
