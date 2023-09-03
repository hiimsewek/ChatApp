import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticatedStackParamsProp, User } from "types";
import { Button } from "react-native-paper";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { createGroupChatDoc, createInitialMessagesDoc } from "./helpers";
import { getAppropriatePhotoURl } from "utils/firebaseUtils";

type NavigationType = NativeStackNavigationProp<AuthenticatedStackParamsProp>;

const useNewGroupChatSetup = (clearSearchData: () => void) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation<NavigationType>();

  const addGroupChatMemberHandler = (user: User) => {
    const membersIndex = selectedUsers.findIndex((el) => el.uid === user.uid);
    if (membersIndex !== -1) {
      removeGroupChatMember(user.uid);
    } else {
      setSelectedUsers((prevData) => [...prevData, { ...user }]);
    }
  };

  const removeGroupChatMember = (uid: string) => {
    const updatedMembers = selectedUsers.filter((item) => item.uid !== uid);
    setSelectedUsers(updatedMembers);
  };

  const isItemSelected = (uid: string) => {
    return selectedUsers.findIndex((el) => el.uid === uid) >= 0;
  };

  const groupNameChangeHandler = (text: string) => {
    setGroupName(text);
  };

  const imagePickHandler = (uri: string) => {
    setSelectedImageUri(uri);
  };

  const createGroupChat = useCallback(async () => {
    try {
      setIsSubmitting(true);
      clearSearchData();

      const groupId = uuid.v4() as string;

      const photoURL = await getAppropriatePhotoURl(
        selectedImageUri,
        `groups/${groupId}/groupPhoto.png`,
        "groups/placeholder_group_avatar.png"
      );

      const createGroupChatDocPromise = createGroupChatDoc(
        groupId,
        groupName,
        photoURL,
        selectedUsers
      );
      const createInitialMessagesDocPromise = createInitialMessagesDoc(
        groupId,
        selectedUsers
      );
      await Promise.all([
        createGroupChatDocPromise,
        createInitialMessagesDocPromise,
      ]);

      navigation.navigate("ChatRoom", { chatId: groupId });
    } catch (e) {
      throw new Error(e);
    } finally {
      setGroupName("");
      setSelectedImageUri(null);
      setSelectedUsers([]);
      setIsSubmitting(false);
    }
  }, [navigation, clearSearchData, groupName, selectedImageUri, selectedUsers]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          mode="text"
          loading={isSubmitting}
          disabled={selectedUsers.length < 2 || !groupName || isSubmitting}
          onPress={async () => {
            await createGroupChat();
          }}
        >
          Create
        </Button>
      ),
    });
  }, [navigation, createGroupChat, groupName, selectedUsers, isSubmitting]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (selectedUsers.length === 0 || e.data.action.type !== "POP") return;

        e.preventDefault();

        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
          { cancelable: true }
        );
      }),
    [navigation, selectedUsers]
  );

  return {
    selectedUsers,
    groupName,
    groupNameChangeHandler,
    addGroupChatMemberHandler,
    removeGroupChatMember,
    selectedImageUri,
    imagePickHandler,
    isItemSelected,
    isSubmitting,
  };
};

export default useNewGroupChatSetup;
