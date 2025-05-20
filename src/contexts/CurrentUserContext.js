import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default CurrentUserContext;
