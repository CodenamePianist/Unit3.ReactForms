import { useState } from "react";

const API_URL = `https://fsa-jwt-practice.herokuapp.com/authenticate`;

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseObj = await response.json();
      setSuccessMessage(responseObj.message);
      console.log(responseObj);
      setUser(responseObj.data.username);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && (
        <p>
          {successMessage} Username is {user}.
        </p>
      )}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
