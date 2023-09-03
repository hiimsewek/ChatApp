import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FormikErrors } from "formik";
import { usersIndex } from "services/algolia";
import { auth, db } from "services/firebaseConfig";
import { SignupFormData, User } from "types";
import { getAppropriatePhotoURl } from "utils/firebaseUtils";

type SignupData = Omit<SignupFormData, "confirmPassword"> & {
  image?: string;
};

type FullUserData = User & {
  email: string;
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("username", "==", username.toLowerCase()));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length === 0;
  } catch (e) {
    throw new Error(e);
  }
};

export const createUser = async (
  values: SignupData,
  setErrors: (errors: FormikErrors<SignupFormData>) => void
) => {
  try {
    const username = values.username.toLowerCase();
    const email = values.email.toLowerCase();

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      values.password
    );

    const photoURL = await getAppropriatePhotoURl(
      values.image,
      `Avatars/${user.uid}/avatar.png`,
      `Avatars/avatar_placeholder.png`
    );

    const updateProfilePromise = updateProfile(user, {
      displayName: username,
      photoURL,
    });

    const createUserDocPromise = createUserDoc({
      uid: user.uid,
      username,
      email,
      photoURL,
    });

    await Promise.all([updateProfilePromise, createUserDocPromise]);

    syncUserDataWithAlgolia({ uid: user.uid, username, email, photoURL });
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      setErrors({ email: "This e-mail has already been taken" });
    } else {
      throw new Error(e);
    }
  }
};

const createUserDoc = async ({
  uid,
  username,
  email,
  photoURL,
}: FullUserData) => {
  await setDoc(doc(db, "users", uid), {
    username,
    email,
    photoURL,
  });
};

const syncUserDataWithAlgolia = ({
  uid,
  username,
  email,
  photoURL,
}: FullUserData) => {
  usersIndex.saveObject({
    objectID: uid,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    photoURL,
  });
};
