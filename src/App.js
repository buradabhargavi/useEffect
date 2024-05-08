import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/Authcontext";

function App() {
  const ctx = useContext(AuthContext);
  /*  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userLogin = localStorage.getItem("isLoggedIn");
    if (userLogin === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => { */
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
  /*  localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
 */
  return (
    <React.Fragment>
      {/*  <AuthContext.Provider
        value={{
          isLoggedin: isLoggedIn,
        }}
      > */}
      <MainHeader
        isAuthenticated={ctx.isLoggedin}
        onLogout={ctx.logoutHandler}
      />
      <main>
        {!ctx.isLoggedin && <Login onLogin={ctx.loginHandler} />}
        {ctx.isLoggedin && <Home onLogout={ctx.logoutHandler} />}
      </main>
      {/*  </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
