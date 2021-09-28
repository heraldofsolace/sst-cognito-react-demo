import { useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";

const PrivateComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        setIsLoggedIn(true);
      } catch (e) {
        if (e !== "No current user") {
          console.log(e);
        }
      }
    }

    onLoad();
  }, []);
  console.log(isLoggedIn)
  if (isLoggedIn) {
    API.get("private", "/private")
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="App">
      {(isLoggedIn && <p> Hi, You are logged in. </p>) || (
        <p> You are not logged in</p>
      )}
    </div>
  );
};

export default PrivateComponent;
