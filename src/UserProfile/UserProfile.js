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
    <div className="userContainer">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          {loading === false ? (
            <div className="profileContainer">
              <h4 className="profileName">
                {user?.FirstName} {user?.LastName}
              </h4>
              <div className="userProfileDetails">
                <div>
                  <img src={user?.ProfileImage} />{' '}
                </div>
                <h6>Email: {user?.email}</h6>
                <h6>Username:{user?.username}</h6>
                <h6>Password: ******</h6>
                <h6>Reset Password</h6>
              </div>
            </div>
          ) : (
            <div> Loading </div>
          )}
        </div>
      ) : (
        <p className="user">No user data available.</p>
      )}
    </div>
  );
}
