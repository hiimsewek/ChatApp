import { auth } from "services/firebaseConfig";
import { ChatType, MessageData, User } from "types";

const getSenderId = (messages: MessageData[], messageIndex: number) => {
  const sender = messages[messageIndex].sentBy;
  return sender;
};

const isCurrentUserSender = (senderId: string) => {
  return auth.currentUser.uid === senderId;
};

export const getMessageDisplayOptions = (
  messages: MessageData[],
  currIndex: number,
  chatType: ChatType
) => {
  const senderId = getSenderId(messages, currIndex);

  let showSenderName =
    senderId && !isCurrentUserSender(senderId) && chatType === ChatType.Group;

  let showSenderPhoto = senderId && !isCurrentUserSender(senderId);

  let messageSpacing = 0;

  if (messages[currIndex - 1]) {
    const prevSenderId = getSenderId(messages, currIndex - 1);
    showSenderPhoto = showSenderPhoto && senderId !== prevSenderId;
  }

  if (messages[currIndex + 1]) {
    const nextSenderId = getSenderId(messages, currIndex + 1);
    showSenderName = showSenderName && senderId !== nextSenderId;

    messageSpacing = senderId !== nextSenderId ? 20 : 5;
  }

  const showReadBy = currIndex === 0;

  return { showSenderPhoto, showSenderName, showReadBy, messageSpacing };
};

export const mapReadByUidToItsData = (readBy: string[], members: User[]) =>
  readBy.map((el: string) => members.find((member: User) => member.uid === el));

export const getSenderDataById = (sentBy: string, members: User[]) =>
  members.find((el) => el.uid === sentBy);
