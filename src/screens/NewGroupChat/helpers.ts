import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "services/firebaseConfig";
import { ChatType, User } from "types";

const generateMessageOnCreate = (members: User[]) => {
  const memberNames = members.map((el) => el.username).join(", ");

  return {
    text: `${auth.currentUser.displayName} added ${memberNames} to the group chat`,
    sentAt: serverTimestamp(),
    readBy: [auth.currentUser.uid],
  };
};

export const createGroupChatDoc = async (
  groupId: string,
  groupName: string,
  photoURL: string,
  groupMembers: User[]
) => {
  const membersIds = groupMembers.map((el) => el.uid);

  await setDoc(doc(db, "chats", groupId), {
    groupName,
    photoURL,
    members: [auth.currentUser.uid, ...membersIds],
    owner: auth.currentUser.uid,
    recentMessage: generateMessageOnCreate(groupMembers),
    chatType: ChatType.Group,
  });
};

export const createInitialMessagesDoc = async (
  groupId: string,
  groupMembers: User[]
) => {
  const messagesRef = collection(db, "chatRooms", groupId, "messages");

  await addDoc(messagesRef, {
    message: generateMessageOnCreate(groupMembers),
  });
};
