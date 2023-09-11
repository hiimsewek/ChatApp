import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "services/firebaseConfig";
import { ChatRoomInfo, ChatsDocData, MessageData, MessageDocData } from "types";
import { getChatUserDetails } from "utils/firebaseUtils";

export const processChatRoomInfo = async (
  document: DocumentSnapshot<DocumentData>
): Promise<ChatRoomInfo> => {
  const { chatType, name, members, photoURL, recentMessage, owner } =
    document.data() as ChatsDocData;

  let chatUserName: string | undefined, chatUserPhoto: string | undefined;

  const membersData = await Promise.all(
    members.map(async (el: string) => {
      return await getChatUserDetails(el);
    })
  );

  if (chatType === 1) {
    const extractedChatUserId = members.find(
      (el) => el !== auth.currentUser.uid
    );
    const { username, photoURL } = await getChatUserDetails(
      extractedChatUserId
    );
    chatUserName = username;
    chatUserPhoto = photoURL;
  }

  const chatRoomName = chatType === 1 ? chatUserName : name;
  const chatRoomPhoto = chatType === 1 ? chatUserPhoto : photoURL;

  return {
    chatType,
    name: chatRoomName,
    photoURL: chatRoomPhoto,
    members: membersData,
    recentMessage,
    owner,
  };
};

export const markRecentMessageAsRead = async (
  chatRef: DocumentReference<DocumentData>,
  recentMessage: MessageDocData
) => {
  if (!recentMessage) return;

  const read = recentMessage.readBy.includes(auth.currentUser.uid);

  if (!read) {
    await updateDoc(chatRef, {
      recentMessage: {
        ...recentMessage,
        readBy: [...recentMessage.readBy, auth.currentUser.uid],
      },
    });
  }
};

export const fetchMessages = async (
  snapshot: QuerySnapshot<DocumentData>
): Promise<MessageData[]> => {
  return await Promise.all(
    snapshot.docs.map(async (document) => {
      const { readBy, sentBy, sentAt, text } =
        document.data() as MessageDocData;

      const { uid } = auth.currentUser;

      const role = !sentBy ? "action" : sentBy === uid ? "sender" : "receiver";

      const readByWithoutSenderOrGroupCreator = readBy.filter(
        (el: string, i: number) => (sentBy ? el !== sentBy : i !== 0)
      );

      return {
        id: document.id,
        text,
        readBy: readByWithoutSenderOrGroupCreator,
        sentAt: sentAt ? sentAt.toDate() : new Date(),
        sentBy,
        role,
      };
    })
  );
};

export const markMessagesAsRead = async (
  snapshot: QuerySnapshot<DocumentData>,
  chatId: string
) => {
  await Promise.all(
    snapshot.docs.map(async (document) => {
      const messageRef = doc(db, "chatRooms", chatId, "messages", document.id);
      await updateDoc(messageRef, {
        readBy: arrayUnion(auth.currentUser.uid),
      });
    })
  );
};
