import UserContext from "./UserContext";
import Game from "./components/Game";
import Engine from "./Engine/Engine";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
function App() {
  if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
      <UserContext>
        <UserButton/>
        <Game />
      </UserContext>
      </SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </ClerkProvider>
  );
}

export default App;
