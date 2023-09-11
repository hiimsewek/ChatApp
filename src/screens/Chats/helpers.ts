import { DocumentData, QuerySnapshot, Timestamp } from "firebase/firestore";
import { auth } from "services/firebaseConfig";
import { ChatInfo, ChatType } from "types";
import { getChatUserDetails } from "utils/firebaseUtils";

type ChatsDocData = {
  chatType: ChatType;
  groupName: string;
  members: string[];
  owner: string;
  photoURL: string;
  recentMessage: {
    text: string;
    sentBy: string;
    sentAt: Timestamp;
    readBy: string[];
  };
};

const extractPrivateChatUserUid = (members: string[]) =>
  members.find((el) => el !== auth.currentUser.uid);

const checkIfRead = (readByArr: string[]) =>
  readByArr.findIndex((el) => el === auth.currentUser.uid) >= 0;

export const processChatsSnapshotData = async (
  snapshot: QuerySnapshot<DocumentData>
) => {
  return await Promise.all(
    snapshot.docs.map(async (doc) => {
      const {
        groupName,
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
        name: chatIsPrivate ? chatUserName : groupName,
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
