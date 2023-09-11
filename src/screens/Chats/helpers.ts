import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { auth } from "services/firebaseConfig";
import { ChatInfo, ChatType, ChatsDocData } from "types";
import { getChatUserDetails } from "utils/firebaseUtils";

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
        name,
        photoURL,
        recentMessage: { text, sentBy, sentAt, readBy },
        chatType,
        members,
      } = doc.data() as ChatsDocData;

      let chatUserName: string | undefined,
        chatUserPhotoURL: string | undefined;

      const isPrivate = chatType === ChatType.Private;

      if (isPrivate) {
        const uid = extractPrivateChatUserUid(members);
        const { username, photoURL } = await getChatUserDetails(uid);
        chatUserName = username;
        chatUserPhotoURL = photoURL;
      }

      const senderData = sentBy && (await getChatUserDetails(sentBy));

      const isCurrentUserSender = sentBy === auth.currentUser.uid;

      const textValue = isCurrentUserSender
        ? `You: ${text}`
        : isPrivate || !senderData
        ? text
        : `${senderData.username}: ${text}`;

      const chatInfo: ChatInfo = {
        id: doc.id,
        name: isPrivate ? chatUserName : name,
        photoURL: isPrivate ? chatUserPhotoURL : photoURL,
        message: {
          text: textValue,
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
