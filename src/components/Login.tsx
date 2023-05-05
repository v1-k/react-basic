import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  setToken: (token: string) => void;
};

function Login({ setToken }: Props) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevformData) => {
      return {
        ...prevformData,
        [name]: value,
      };
    });
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegistering) {
      if (formData.password != formData.confirmPassword) {
        setError("Password not matched");
        return;
      }
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/register",
          {
            username: formData.username,
            password: formData.password,
          }
        );
        const data = response.data;

        if (data.access_token && data.token_type === "bearer") {
          setToken(`${data.access_token}`);
          navigate("/");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } catch (error) {
        setError(
          "Invalid credentials. Use different email/password combination"
        );
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/login",
          {
            username: formData.username,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = response.data;

        if (data.access_token && data.token_type === "bearer") {
          setToken(`${data.access_token}`);
          navigate("/");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setError("Invalid credentials.");
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>{isRegistering ? "Register" : "Login"}</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {isRegistering && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      {isRegistering ? "Register" : "Login"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setIsRegistering(!isRegistering)}
                    >
                      {isRegistering
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
