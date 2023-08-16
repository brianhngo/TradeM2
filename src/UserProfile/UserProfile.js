import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';
import {
  ref as refFromStorage,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import User from '../UserProduct/User';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function UserProfile() {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings((prevShowSettings) => !prevShowSettings);
  };
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [uid, setUid] = useState('');
  const dbref = ref(getDatabase());
  const [email, setEmail] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  // Toast notification
  const toastInfo = () => {
    toast.info("Saved");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    toastInfo();
    // User's DB reference
    try {
      const newData = {
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
      set(child(dbref, "Users/" + uid), newData);

      console.log("button is clicked");
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
        "state_changed",
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

            set(child(dbref, "Users/" + uid), updatedUser);
            console.log("uploaded Image");
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Checking Once the page is loaded, it will check the auth token. If true, it will //Update
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        setUid(userData.uid);

        console.log(uid);
        get(child(dbref, 'Users/' + uid))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUser(snapshot.val());
            }
          })
          .catch((error) => {
            console.log('hi');
            console.error('Error Fetching User Data', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe(); // Cleanup function to remove the listener
    };
  }, [user]);

  // Getting the users information Updates when user hits Save
  useEffect(() => {
    if (user) {
      setEmail(user?.email);
      setFirstName(user?.FirstName);
      setLastName(user?.LastName);
      setUsername(user?.userName);
      setPronoun(user?.pronoun || 'None');
      setUrl(user?.profileImage || '');
    }
  }, [user]);
//user profile change
  return (
    <>
      <div className="userContainer">
        {loading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <div className="modalProfileOverlay">
            <div className="profile-card-container">
              <div className="user-profile">
              <span className="gearIcon" {/*this is changed*/}onClick={toggleSettings}>&#9881;</span> 
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

            {showSettings && (
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
                    <label htmlFor="pronouns">Pronoun</label>
                    <select
                      value={pronoun}
                      onChange={(e) => setPronoun(e.target.value)}>
                      <option value="None">None</option>
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

                  <div className="buttonContainer">
                    <button className="saveButton">Save</button>
                  </div>
                </form>
              </div>
            </div>
            )}
            <User uid={uid} />
          </div>
        )}
      </div>
    </>
  );
}
