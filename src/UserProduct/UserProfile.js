import React from 'react';
import { useHistory } from "react-router-dom";
import firebase from '../firebase';

//display user profile info + image upload button
//only if that user is viewing their own profile
const UserProfile = ({ user, isCurrentUser }) => {
  const history = useHistory();

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("Uploaded file", file.name);
      fileRef.getDownloadURL().then(url => {
        const userRef = firebase.database().ref('Users').child(user.uid);
        userRef.update({ 'Profile Image': url });
      });
    });
  };

  return (
    <div className="user-profile">
      <img src={user["Profile Image"]} alt={user.Username} />
      <h2>{user.Username}</h2>
      <p>{user["Email Address"]}</p>
      <p>{user.Address}</p>
      {isCurrentUser && (
        <>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={() => history.push("/productform")}>
            Create New Product
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;