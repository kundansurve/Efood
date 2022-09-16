const fetchUserInfoFunc=(setUserData)=>{
    fetch("http://localhost:4000/api/authenticate/me")
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