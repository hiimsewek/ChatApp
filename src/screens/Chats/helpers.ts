import { DocumentData, QuerySnapshot, doc, getDoc } from "firebase/firestore";
import { auth, db } from "services/firebaseConfig";
import { ChatInfo, ChatType, ChatsDocData, UserWithoutUid } from "types";

const extractPrivateChatUserUid = (members: string[]) =>
  members.find((el) => el !== auth.currentUser.uid);

const getChatUserDetails = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { username, photoURL } = docSnap.data() as UserWithoutUid;

    return { username, photoURL };
  }
};

const checkIfRead = (readByArr: string[]) =>
  readByArr.findIndex((el) => el === auth.currentUser.uid) >= 0;

export const processChatsSnapshotData = async (
  snapshot: QuerySnapshot<DocumentData>
) => {
  return await Promise.all(
    snapshot.docs.map(async (doc) => {
      const {
        name,
        photoURL,
        recentMessage: { text, sentBy, sentAt, readBy },
        chatType,
        members,
      } = doc.data() as ChatsDocData;

      let chatUserName: string | undefined,
        chatUserPhotoURL: string | undefined;

      const chatIsPrivate = chatType === ChatType.Private;
      if (chatIsPrivate) {
        const uid = extractPrivateChatUserUid(members);
        const { username, photoURL } = await getChatUserDetails(uid);
        chatUserName = username;
        chatUserPhotoURL = photoURL;
      }

      const chatInfo: ChatInfo = {
        id: doc.id,
        name: chatIsPrivate ? chatUserName : name,
        photoURL: chatIsPrivate ? chatUserPhotoURL : photoURL,
        message: {
          text: sentBy === auth.currentUser.uid ? `You: ${text}` : text,
          sentAt: sentAt ? sentAt.toDate() : new Date(),
          isRead: checkIfRead(readBy),
        },
      };

      return chatInfo;
    })
  );
};

export const sortChatsFromLatest = (chats: ChatInfo[]) =>
  chats.sort((a, b) => Number(b.message.sentAt) - Number(a.message.sentAt));
