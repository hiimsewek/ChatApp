import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "services/firebaseConfig";
import { AuthenticatedStackParamsProp, ChatInfo } from "types";
import { HeaderRightActions } from "./components";
import { Avatar } from "react-native-paper";
import { processChatsSnapshotData, sortChatsFromLatest } from "./helpers";
import { Platform } from "react-native";

type NavigationType = NativeStackNavigationProp<AuthenticatedStackParamsProp>;

const useChats = () => {
  const [userPhoto, setUserPhoto] = useState(auth.currentUser.photoURL);
  const [chats, setChats] = useState<ChatInfo[] | null>(null);

  const navigation = useNavigation<NavigationType>();

  useLayoutEffect(() => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribeUserListener = onSnapshot(
      userRef,
      (doc) => doc.data() && setUserPhoto(doc.data().photoURL)
    );

    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <Avatar.Image
          size={Platform.OS === "ios" ? 40 : 46}
          source={{ uri: userPhoto }}
        />
      ),
      headerRight: () => <HeaderRightActions />,
    });

    return unsubscribeUserListener;
  }, [navigation, userPhoto]);

  useEffect(() => {
    const groupsRef = query(
      collection(db, "chats"),
      where("members", "array-contains", auth.currentUser.uid),
      where("recentMessage", "!=", null)
    );

    const unsubscribeChatsListener = onSnapshot(groupsRef, async (snapshot) => {
      const processedChats = await processChatsSnapshotData(snapshot);
      sortChatsFromLatest(processedChats);
      setChats(processedChats);
    });

    return unsubscribeChatsListener;
  }, []);

  return { chats };
};

export default useChats;
