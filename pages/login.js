import axios from "axios";
import { useReducer } from "react";
import { storeAuthTokenInStorage } from "../utils/auth";
import { useRouter } from "next/router";
import Field from "../components/Field";
import useAuth from "../hooks/useAuth";

const initialState = {
  login: "test@test.nl",
  password: "test123",
  errors: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set_login":
      return { ...state, login: payload.login };
    case "set_password":
      return { ...state, password: payload.password };
    default:
      return state;
  }
};

export default function LoginPage() {
  const [authToken, setAuthToken] = useAuth();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();
    try {
      if (state.login && state.password) {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_WORDPRESS_API_URI +
            "/wp-json/jwt-auth/v1/token",
          { username: state.login, password: state.password }
        );
        if (response?.data) {
          const { token } = response.data;
          if (token) {
            setAuthToken(token);
            router.push("/dashboard");
          }
        }
      } else {
        // localStorage.removeItem("authToken");
        dispatch({
          type: "set_errors",
          payload: { errors: ["Please enter both fields."] },
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto">
      <form className="p-4">
        <div className="mb-3">
          <Field
            type="text"
            label="Login or email"
            value={state.login}
            changeHandler={(e) =>
              dispatch({
                type: "set_login",
                payload: { login: e.target.value },
              })
            }
          />
        </div>
        <div className="mb-3">
          <Field
            type="password"
            label="Password"
            value={state.password}
            changeHandler={(e) =>
              dispatch({
                type: "set_password",
                payload: { password: e.target.value },
              })
            }
          />
        </div>
        <div>
          <button
            className="button button-primary"
            onClick={handleSubmitButtonClick}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
