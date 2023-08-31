import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "services/firebaseConfig";
import { uriToBlob } from "utils/convert";

export const docExist = async (
  collectionName: string,
  field: string,
  value: string
) => {
  try {
    const usersRef = collection(db, collectionName);

    const q = query(usersRef, where(field, "==", value.toLowerCase()));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length !== 0;
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadFileAndGetUrl = async (
  pathDestination: string,
  uri: string
) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, pathDestination);

    const blobFile = (await uriToBlob(uri)) as Blob;

    await uploadBytes(storageRef, blobFile);

    const fileUrl = await getDownloadURL(storageRef);

    return fileUrl;
  } catch (e) {
    throw new Error(e);
  }
};

export const getFileUrl = async (path: string) => {
  try {
    const storage = getStorage();

    const storageRef = ref(storage, path);
    const fileUrl = await getDownloadURL(storageRef);
    return fileUrl;
  } catch (e) {
    throw new Error(e);
  }
};
