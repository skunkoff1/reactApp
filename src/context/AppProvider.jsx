import { createContext } from "react";

const AppContext = createContext({
    user: {
      id:  null,
      name:  null,
      email: null,
      tokenAccess: null,
      tokenRefresh: null,
      role: null,
    },
    theme: 'light',
    onUserChange: () => null,
    onThemeChange: () => null,
  });

export default AppContext;