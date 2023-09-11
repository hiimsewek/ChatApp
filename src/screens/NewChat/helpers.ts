import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "services/firebaseConfig";
import { ChatType, ChatsDocData } from "types";

export const getChatIdIfExists = async (uid: string) => {
  try {
    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", auth.currentUser.uid),
      where("chatType", "==", 1)
    );

    const querySnapshot = await getDocs(q);

    let chatId: string | undefined;

    const chatIndex = querySnapshot.docs.findIndex((doc) => {
      const { members } = doc.data() as ChatsDocData;
      return members.includes(uid);
    });

    if (chatIndex >= 0) chatId = querySnapshot.docs[chatIndex].id;

    return chatId;
  } catch (e) {
    throw new Error(e);
  }
};

export const createPrivateChatDoc = async (uid: string) => {
  const chatsCollectionRef = collection(db, "chats");

  try {
    const doc = await addDoc(chatsCollectionRef, {
      members: [auth.currentUser.uid, uid],
      chatType: ChatType.Private,
    });
    return doc;
  } catch (err) {
    throw new Error(err);
  }
};
