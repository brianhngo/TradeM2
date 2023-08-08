import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage, ref as refStorage, put, getDownloadURL } from "firebase/storage";
import firebase from '../firebase';

function ProductForm() {
async function handleFormSubmit(event) {
event.preventDefault();

    var user = firebase.auth().currentUser;

    if (user) {
        //handle file upload
        var file = event.target.image.files[0];
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child('images/' + file.name);
        await fileRef.put(file);
        var imageUrl = await fileRef.getDownloadURL();

        var uid = user.uid;
        var productData = {
            name: event.target.name.value,
            description: event.target.description.value,
            price: event.target.price.value,
            category: event.target.category.value,
            image: imageUrl,
            userId: uid,  //associate product with current logged in user
        };

        //send product data to firebase.
        var db = firebase.database();
        db.ref('Products').push(productData);
    } else {
        //might need to add this part
        //for handling when it is guest user or not the user who owns the page
    }
}

return (
    <form onSubmit={handleFormSubmit}>
        <input name="name" type="text" placeholder="Product Name" required />
        <input name="description" type="text" placeholder="Description" required />
        <input name="price" type="number" placeholder="Price" required />
        <select name="category" required>
            <option value="">Select a Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
        </select>
        <input name="image" type="file" required />
        <button type="submit">Create Product</button>
    </form>
);
}

export default ProductForm;