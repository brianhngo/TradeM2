import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MessengerGrid from './MessengerGrid';

export default function ChatList() {
  // I need to useEffect to get the ID of the user. Then Once i get the ID i will pass it down to MessengerGrid
  //MessengerGrid will search in the database if the user exist. If it does it will extract an array and map
  // If it doesnt a useEffect will create a new database

  const [user, setUser] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      try {
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      unsubscribe();
    };
  });
  console.log(user.uid);
  return (
    <>
      <h1> List of all your messages </h1>

      <MessengerGrid userId={user.uid} />
    </>
  );
}
