import React from "react";
import { Wrapper, Searchbar, UsersList } from "components";
import { GroupChatIdentity, SelectableUser, UserChipsList } from "./components";
import { useSearchUsers } from "hooks";
import useNewGroupChat from "./useNewGroupChat";

const NewGroupChatSetup = () => {
  const {
    changeTextHandler,
    clearTextHandler,
    clearSearchData,
    isSearching,
    typedText,
    users,
  } = useSearchUsers();

  const {
    addGroupChatMemberHandler,
    groupName,
    groupNameChangeHandler,
    imagePickHandler,
    isItemSelected,
    isSubmitting,
    removeGroupChatMember,
    selectedImageUri,
    selectedUsers,
  } = useNewGroupChat(clearSearchData);

  return (
    <Wrapper>
      <GroupChatIdentity
        groupName={groupName}
        onGroupNameChanged={groupNameChangeHandler}
        image={selectedImageUri}
        onImagePick={imagePickHandler}
        disabled={isSubmitting}
      />
      <Searchbar
        value={typedText}
        onChangeText={changeTextHandler}
        onClearIconPress={clearTextHandler}
        placeholder="Search user"
        loading={isSearching}
      />
      {selectedUsers.length > 0 && !isSubmitting && (
        <UserChipsList
          data={selectedUsers}
          onChipRemove={removeGroupChatMember}
        />
      )}
      {users && (
        <UsersList
          data={users}
          renderItem={({ item }) => (
            <SelectableUser
              item={item}
              onUserPress={addGroupChatMemberHandler.bind(this, item)}
              isSelected={isItemSelected}
            />
          )}
        />
      )}
    </Wrapper>
  );
};

export default NewGroupChatSetup;
