import { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticatedStackParamsProp } from "types";
import { createPrivateChatDoc, getChatIdIfExists } from "./helpers";
import { IconButton } from "react-native-paper";

type NavigationType = NativeStackNavigationProp<AuthenticatedStackParamsProp>;

const useNewChatSelector = (clearSearchData: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation<NavigationType>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="account-group"
          onPress={() => {
            clearSearchData();
            navigation.navigate("NewGroupChat");
          }}
          disabled={isSubmitting}
        />
      ),
    });
  }, [navigation, clearSearchData, isSubmitting]);

  const createPrivateChat = async (uid: string) => {
    try {
      setIsSubmitting(true);
      clearSearchData();

      const chatId = await getChatIdIfExists(uid);
      if (chatId) {
        navigation.replace("ChatRoom", { chatId });
        return;
      }

      const doc = await createPrivateChatDoc(uid);
      navigation.navigate("ChatRoom", { chatId: doc.id });
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    createPrivateChat,
  };
};

export default useNewChatSelector;
