const fetchUserInfoFunc=(setUserData)=>{
    fetch("/api/authenticate/me")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          console.log(data["error"]);
          return;
        }
        sessionStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
      })
      .catch((error) => console.log(error));
  }

export default fetchUserInfoFunc;