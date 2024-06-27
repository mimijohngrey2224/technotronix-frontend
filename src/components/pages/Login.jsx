import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import EcomContext from "../../context/EcomContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(AuthContext);
  const { showAndHide } = useContext(EcomContext);
  const { setItem } = useLocalStorage("auth-token");

  const isAuthenticated = state.accessToken !== null;

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const redirect = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://technotronix-api-vh62.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data === "Invalid Email/Password") {
        showAndHide("error", "Invalid Email/Password");
      } else {
        dispatch({ type: "setToken", payload: data.token });
        setItem(data.token);
        redirect("/");
        showAndHide("success", "Login Successful!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-[50%] mx-auto font-semibold my-[5%]">
        <h1 className="mb-5 font-bold text-center text-2xl">Login</h1>
        <form onSubmit={loginHandler}>
          <div className="flex flex-col gap-3 mb-3">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="outline outline-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 mb-3">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="outline outline-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className="bg-black text-white p-[10px] rounded-md hover:bg-orange-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
