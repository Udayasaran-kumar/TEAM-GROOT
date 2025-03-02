// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const username = localStorage.getItem("username");

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-white p-6 shadow-lg rounded-md">
//         <h2 className="text-xl mb-4">Profile</h2>
//         <p>Welcome, <strong>{username || "User"}</strong>!</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from 'react'

function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}

export default Profile
