import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useSearchUsers } from "hooks";
import useNewChat from "./useNewChat";
import { UsersList, Searchbar, Wrapper } from "components";
import { PressableUser } from "./components";

const NewChat = () => {
  const {
    changeTextHandler,
    clearSearchData,
    clearTextHandler,
    isSearching,
    typedText,
    users,
  } = useSearchUsers();

  const { createPrivateChat, isSubmitting } = useNewChat(clearSearchData);

  return (
    <Wrapper>
      <Searchbar
        value={typedText}
        onChangeText={changeTextHandler}
        onClearIconPress={clearTextHandler}
        placeholder="Search user"
        loading={isSearching}
      />
      {users && (
        <UsersList
          data={users}
          renderItem={({ item }) => (
            <PressableUser
              onUserPress={createPrivateChat.bind(this, item.uid)}
              username={item.username}
              photoURL={item.photoURL}
            />
          )}
        />
      )}
      {isSubmitting && <ActivityIndicator />}
    </Wrapper>
  );
};

export default NewChat;
