import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FormikErrors } from "formik";
import { usersIndex } from "services/algolia";
import { auth, db } from "services/firebaseConfig";
import { SignupFormData } from "types";
import { docExist, getFileUrl, uploadFileAndGetUrl } from "utils/firebaseUtils";

type UserData = Omit<SignupFormData, "confirmPassword"> & {
  image?: string;
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const usernameAvailable = !(await docExist("users", "username", username));
    return usernameAvailable;
  } catch (e) {
    throw new Error(e);
  }
};

export const createUser = async (
  values: UserData,
  setErrors: (errors: FormikErrors<SignupFormData>) => void
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const photoURL = values.image
      ? await uploadFileAndGetUrl(
          `Avatars/${user.uid}/avatar.png`,
          values.image
        )
      : await getFileUrl(`Avatars/avatar_placeholder.png`);

    const updateProfilePromise = updateProfile(user, {
      displayName: values.username.toLowerCase(),
      photoURL,
    });

    const createUserDocPromise = setDoc(doc(db, "users", user.uid), {
      username: values.username.toLowerCase(),
      email: values.email.toLowerCase(),
      photoURL,
    });

    await Promise.all([updateProfilePromise, createUserDocPromise]);

    usersIndex.saveObject({
      objectID: user.uid,
      username: values.username.toLowerCase(),
      email: values.email.toLowerCase(),
      photoURL,
    });
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      setErrors({ email: "This e-mail has already been taken" });
    } else {
      throw new Error(e);
    }
  }
};
