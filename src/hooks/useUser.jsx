import { useEffect, useState } from "react";
import { getUser } from "services/userService";

function useUser() {
  const [userDetails, setUserDetails] = useState(null);

  const refreshUser = async () => {
    const newDetails = await getUser();
    console.log(newDetails);
    if (newDetails.ok) {
      localStorage.setItem("userDetails", JSON.stringify(newDetails.data));
      setUserDetails(newDetails.data);
      console.log("UPDATED USER DATA", userDetails);
    } else {
      console.log("Err updating user");
    }
  };

  useEffect(() => {
    // const storedUserDetails = localStorage.getItem("userDetails");

    // if (storedUserDetails) {
    //   setUserDetails(JSON.parse(storedUserDetails));
    // }
    refreshUser();
  }, []);

  return { userDetails, refreshUser };
}

export default useUser;
