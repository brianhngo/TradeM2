import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { auth } from '../firebase';
import { useState } from 'react';
import React from 'react';
import './UserProduct.css';

const UserCard = ({ user }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  //this will handle file input and set the file to image state
  //need to work on limiting file choices to image files
  //such as jpg, jpeg, png
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //this is for uploading selected file to firebase
  const handleSubmitImage = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages//profileImages`);
    //const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`); check for auth user uid to save profile image
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {}, //handle state change
      (error) => {
        console.log(error);
      }, //handle error
      () => {
        //handle upload complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log('get this file from the url', downloadURL);
        });
      }
    );
  };

  const handleAddProduct = () => {
    console.log('Adding a new product..');
    //add a new product
  };
  console.log(user.profileImageUrl);
  return (
    <div className="profile-card-container">
      <div className="user-profile">
        <img
          className="user-profile-image"
          src={url || user.profileImageUrl}
          alt="User profile"
        />
        <h2 className="user-name">{user.name}</h2>
        <h4 className="upload-profile-image-title">Upload Profile Image</h4>
        <input
          className="upload-profile-image-input"
          type="file"
          onChange={handleImageChange}
        />
        <button
          className="submit-profile-image-btn"
          onClick={handleSubmitImage}>
          Submit Profile Image
        </button>
      </div>
    </div>
  );
};

export default UserCard;
