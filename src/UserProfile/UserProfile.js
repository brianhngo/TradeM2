import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database';
import './UserProfile.css';

import { useLocation } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const uid = location.state.uid;

  useEffect(() => {
    if (uid) {
      const dbref = ref(getDatabase());

      get(child(dbref, 'Users/' + uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
            console.log(user);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  console.log(user);
  return (
    <>
      {uid ? (
        <div className="userContainer">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="profileContainer">
              <div className="leftProfileContainer">
                <div> image </div>
                <div> firstName </div>
              </div>
              <div className="middleProfileContainer">
                <label htmlFor="firstName"> First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"></input>
                <label htmlFor="lastName"> Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="last Name"></input>
                <label htmlFor="email"> Email</label>
                <input type="text" name="firstName" placeholder="Email"></input>
                <label htmlFor="phone"> Phone</label>
                <input type="text" name="phone" placeholder="Phone #"></input>
                <label htmlFor="address"> Address</label>
                <input type="text" name="address" placeholder="Address"></input>
                <label htmlFor="city"> City</label>
                <input type="text" name="city" placeholder="City"></input>
                <label htmlFor="postalCode"> Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"></input>
                <label htmlFor="State"> Region/State</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Region/State"></input>
                <label htmlFor="country"> Country</label>
                <input type="text" name="country" placeholder="Country"></input>
                <div> Preferred Method (text, email, phone) </div>
                <button> Edit</button>
                <button> Save </button>
              </div>
              <div className="rightProfileContainer">
                <p> Right side of Container</p>
              </div>
            </div>
          ) : (
            <p className="user">No user data available.</p>
          )}
        </div>
      ) : (
        <h3>Please create an account or log in to see the profile page</h3>
      )}
    </>
  );
}

{
  /* <>
  {uid ? (
    <div className="userContainer">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="profileContainer">
          <h4 className="profileName">
            {user?.FirstName} {user?.LastName}
          </h4>
          <div className="userProfileDetails">
            <div>
              <img src={user?.ProfileImage} alt="Profile" />
            </div>
            <h6>Email: {user?.email}</h6>
            <h6>Username: {user?.username}</h6>
            <h6>Password: ******</h6>
            <h6>Reset Password</h6>
          </div>
        </div>
      ) : (
        <p className="user">No user data available.</p>
      )}
    </div>
  ) : (
    <h3>Please create an account or log in to see the profile page</h3>
  )}
</>; */
}
