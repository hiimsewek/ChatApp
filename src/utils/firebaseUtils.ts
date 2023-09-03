import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uriToBlob } from "utils/convert";

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

export const getAppropriatePhotoURl = async (
  photo: string | null,
  fileDestination: string,
  fallbackFilePath: string
) => {
  const photoURL = photo
    ? await uploadFileAndGetUrl(fileDestination, photo)
    : await getFileUrl(fallbackFilePath);

  return photoURL;
};
