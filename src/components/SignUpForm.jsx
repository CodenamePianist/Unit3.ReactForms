import { useState } from "react";

const API_URL = `https://fsa-jwt-practice.herokuapp.com/signup`;

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //   if (username.length < 8) {
      //     throw new Error("Username needs to be 8 characters or more");
      //   }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const responseObj = await response.json();
      setToken(responseObj.token);
      console.log(responseObj);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            id="username"
            minLength={8}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
