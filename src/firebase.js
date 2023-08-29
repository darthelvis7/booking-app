import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  collection,
  getDocs,
} from 'firebase/firestore';
import {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} from '@firebase/storage';
import { async } from '@firebase/util';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// User Authentication Methods

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // Return if email or password is not provided
  if (!email || !password) return;

  // Create the user account using email and password
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Return if user authentication information is not provided
  if (!userAuth) return;

  // Get a reference to the user document in the Firestore database
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  // Get the snapshot of the user document
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // Check if the user document already exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Create the user document in Firestore with the provided information
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }
  return userDocRef;
};

// Get User Doc

export const getUserDocument = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.error('User document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
};

// Image Update

export const getUserProfileImageUrl = async (userId) => {
  try {
    // Get a reference to the user document in the Firestore database
    const userDocRef = doc(db, 'users', userId);

    // Get the snapshot of the user document
    const userSnapshot = await getDoc(userDocRef);

    // Check if the user document exists
    if (userSnapshot.exists()) {
      // Get the profileImageUrl from the user document data
      const userProfileImageUrl = userSnapshot.data().profileImageUrl;
      return userProfileImageUrl;
    } else {
      console.log('User document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profileImageUrl:', error);
    return null;
  }
};

export const updateUserDocumentProfileImage = async (userId, profileImage) => {
  try {
    // Create a reference to the Firebase Storage bucket
    const storage = getStorage();

    // Create a reference to the profile image file in Firebase Storage
    const storageRef = ref(storage, `profileImages/${userId}`);

    // Upload the profile image file to Firebase Storage
    await uploadBytes(storageRef, profileImage);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);

    // Update the user document in Firestore with the profileImageUrl
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      profileImageUrl: imageUrl,
    });

    return imageUrl;
  } catch (error) {
    throw new Error('Error uploading profile image:', error);
  }
};

// Bio Update

// export const updateUserDocumentBio = async (userId, bio) => {
//   try {
//     const userDocRef = doc(db, 'users', userId);
//     await updateDoc(userDocRef, {
//       bio,
//     });
//     console.log('User document updated successfully!', userDocRef);
//   } catch (error) {
//     console.error('Error updating user document:', error);
//   }
// };

// export const updateUserDocumentBusiness = async (userId, business) => {
//   try {
//     const userDocRef = doc(db, 'users', userId);
//     await updateDoc(userDocRef, {
//       business,
//     });
//     console.log('User document updated successfully!', userDocRef);
//   } catch (error) {
//     console.error('Error updating user document:', error);
//   }
// };

export const updateUserDocumentField = async (userId, fieldName, value) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const updateData = {};
    updateData[fieldName] = value;
    await updateDoc(userDocRef, updateData);
    console.log('User document updated successfully!', userDocRef);
  } catch (error) {
    console.error('Error updating user document:', error);
  }
};
