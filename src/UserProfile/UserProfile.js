import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import './UserProfile.css';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, 'Users/1'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
          console.log(userData); // Log user data
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div>
      {loading === false ? (
        <div className="profileContainer">
          <h4 className="profileName">
            {user['FirstName']} {user['LastName']}
          </h4>
          <div className="userProfileDetails">
            <div>
              <img src={user['Profile Image']} />{' '}
            </div>
            <h6>Email: {user['Email Address']}</h6>
            <h6>Username:{user['Username']}</h6>
            <h6>Password: ******</h6>
            <h6>Reset Password</h6>
          </div>
        </div>
      ) : (
        <div> Loading </div>
      )}
    </div>
  );
}
