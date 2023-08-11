import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';

import { useLocation } from 'react-router-dom';
import {
  ref as refFromStorage,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import User from '../UserProduct/User';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const uid = location?.state?.uid || '';
  const dbref = ref(getDatabase());

  const [email, setEmail] = useState('');
  const [pronoun, setPronoun] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [streetAddress, setStreetAddress] = useState('');
  // const [city, setCity] = useState('');
  // const [postalCode, setPostalCode] = useState('');
  // const [region, setRegion] = useState('');
  // const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  // Toast notification
  // Updates DB
  const toastInfo = () => {
    toast.info('Saved');
  };

  const submitHandler = (event) => {
    event.preventDefault();
    toastInfo();
    // User's DB reference
    try {
      const newData = {
        // Address: streetAddress,
        // city: city,
        // postalCode: postalCode,
        // region: region,
        // country: country,
        Admin: false,
        email: email,
        FirstName: firstName,
        LastName: lastName,
        pronoun: pronoun,
        profileImage: url,
        userName: username,
        id: uid,
        profileStatus: true,
      };
      set(child(dbref, 'Users/' + uid), newData);

      console.log('button is clicked');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitImage = (e) => {
    try {
      e.preventDefault();
      toastInfo();
      const storage = getStorage();
      const storageRef = refFromStorage(storage, `profileImages/${uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);

            // Update the entire user object with the updated profileImage property
            const updatedUser = {
              ...user,
              profileImage: downloadURL,
            };

            set(child(dbref, 'Users/' + uid), updatedUser);
            console.log('uploaded Image');
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (uid) {
      get(child(dbref, 'Users/' + uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
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
  }, [uid]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      // setStreetAddress(user.Address);
      // setCity(user.city);
      // setPostalCode(user.postalCode);
      // setRegion(user.region);
      // setCountry(user.country);
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setUsername(user.userName);
      setPronoun(user.pronoun);
      setUrl(user.profileImage);
    }
  }, [user]);

  return (
    <>
      {uid ? (
        <div className="userContainer">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="modalProfileOverlay">
              <div className="profile-card-container">
                <div className="user-profile">
                  <img
                    src={url ? url : 'testimage2.png'}
                    alt="User profile"
                    className="user-profile-image"
                  />
                  <h2 className="user-name">{firstName}</h2>
                  <h4 className="upload-profile-image-title">
                    Upload Profile Image
                  </h4>
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
                  <div> {user?.firstName} </div>
                </div>
              </div>

              <div className="userinput-container">
                <div className="userinput-container-profile">
                  <h2>Profile Settings</h2>
                  <form onSubmit={submitHandler}>
                    <div className="namesContainer">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="pronouns">Pronouns</label>
                      <select
                        value={pronoun}
                        onChange={(e) => setPronoun(e.target.value)}
                        name="pronouns">
                        <option value="He/Him/His">He/Him/His</option>
                        <option value="She/Her/Hers">She/Her/Hers</option>
                        <option value="They/Them/Their">They/Them/Their</option>
                        <option value="Ze/Zir/Zirs">Ze/Zir/Zirs</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        readOnly
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Username</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="State">Region/State</label>
                      <input
                        type="text"
                        name="region"
                        placeholder="Region/State"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div> */}
                    <div className="buttonContainer">
                      <button className="saveButton">Save</button>
                    </div>
                  </form>
                </div>
              </div>
              <User uid={uid} />
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
