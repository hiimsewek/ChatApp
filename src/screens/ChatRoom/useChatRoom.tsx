import { useEffect, useState, useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AuthenticatedStackParamsProp, ChatRoomInfo, MessageData } from "types";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "services/firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatRoomTitle } from "./components";
import { ActivityIndicator } from "react-native-paper";
import {
  fetchMessages,
  markMessagesAsRead,
  markRecentMessageAsRead,
  processChatRoomInfo,
} from "./helpers";

type RouteType = RouteProp<AuthenticatedStackParamsProp, "ChatRoom">;
type NavigationType = NativeStackNavigationProp<AuthenticatedStackParamsProp>;

const useChatRoom = () => {
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo | null>(null);
  const [messages, setMessages] = useState<MessageData[] | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavigationType>();

  const chatId = route.params.chatId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTitleAlign: "left",
      headerTitle: () =>
        chatRoomInfo ? (
          <ChatRoomTitle
            name={chatRoomInfo.name}
            photoURL={chatRoomInfo.photoURL}
          />
        ) : (
          <ActivityIndicator />
        ),
    });
  }, [navigation, chatRoomInfo]);

  useEffect(() => {
    const chatRef = doc(db, "chats", chatId);
    const chatRoomRef = collection(db, "chatRooms", chatId, "messages");

    const unsubscribeChatListener = onSnapshot(chatRef, async (document) => {
      const processedInfo = await processChatRoomInfo(document);
      setChatRoomInfo(processedInfo);

      await markRecentMessageAsRead(chatRef, processedInfo.recentMessage);
    });

    const unsubscribeChatRoomListener = onSnapshot(
      query(chatRoomRef, orderBy("sentAt", "desc")),
      async (snapshot) => {
        const messages = await fetchMessages(snapshot);
        setMessages(messages);

        await markMessagesAsRead(snapshot, chatId);
      }
    );

    return () => {
      unsubscribeChatListener();
      unsubscribeChatRoomListener();
    };
  }, [chatId]);

  const newMessageChangeHandler = (text: string) => setNewMessage(text);

  const sendMessage = async () => {
    try {
      setNewMessage("");

      const { uid } = auth.currentUser;

      const message = {
        text: newMessage,
        sentBy: uid,
        sentAt: serverTimestamp(),
        readBy: [uid],
      };

      const addMessageDocPromise = addDoc(
        collection(db, "chatRooms", chatId, "messages"),
        message
      );

      const updateChatDocPromise = updateDoc(doc(db, "chats", chatId), {
        recentMessage: message,
      });

      await Promise.all([addMessageDocPromise, updateChatDocPromise]);
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    chatRoomInfo,
    messages,
    newMessage,
    newMessageChangeHandler,
    sendMessage,
  };
};

export default useChatRoom;
