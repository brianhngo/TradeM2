import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';

import { getDatabase, ref, update, child, get } from 'firebase/database';

export default function Bookmark({ productId }) {
  const [bookmarkStatus, setBookMarkStatus] = useState(false);

  const userData = auth.currentUser ? auth.currentUser : '';
  const bookMarkHandler = (event) => {
    event.preventDefault();
    setBookMarkStatus(!bookmarkStatus);
    if (userData === '') {
      toast.warning('Please Sign in or register to use this feature!');
      return;
    }

    if (!bookmarkStatus) {
      toast.success('Bookmarked!');
      updateBookmarkDatabase(true);
    } else {
      toast.success('Removed from Bookmarks');
      updateBookmarkDatabase(false);
    }
  };

  const updateBookmarkDatabase = async (addToBookmark) => {
    try {
      if (userData) {
        const dbRef = ref(getDatabase());
        const bookmarksRef = child(dbRef, `Users/${userData.uid}/Bookmarks/`);

        if (addToBookmark) {
          // if we are adding to the database
          update(bookmarksRef, {
            [productId]: true,
          });
        } else {
          // if status is false remove the bookmarked item from our DB
          update(bookmarksRef, { [productId]: null });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const bookmarksRef = child(
      dbRef,
      `Users/${userData.uid}/Bookmarks/${productId}`
    );
    get(bookmarksRef).then((snapshot) => {
      if (snapshot.exists()) {
        setBookMarkStatus(true);
      }
    });
  }, []);

  return (
    <div className={`bookmark-icon ${bookmarkStatus ? 'bookmarked' : ''}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-bookmark-star-fill"
      viewBox="0 0 16 16"
      onClick={bookMarkHandler}
    >
      <path
        fillRule="evenodd"
        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
      />
    </svg>
  </div>
  );
}
