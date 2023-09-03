import React from "react";
import { FlatList } from "react-native-gesture-handler";
import styles from "./styles";
import { User } from "types";
import { ListRenderItem } from "react-native";

type UsersListProps = {
  data: User[];
  renderItem: ListRenderItem<User>;
};

const UsersList = ({ data, renderItem }: UsersListProps) => {
  return (
    <FlatList
      style={styles.usersList}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid}
    />
  );
};

export default UsersList;
