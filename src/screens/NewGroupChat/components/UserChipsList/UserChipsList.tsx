import React from "react";
import { FlatList } from "react-native";
import { User } from "types";
import UserChip from "../UserChip/UserChip";
import styles from "./styles";

type UserChipsListProps = {
  data: User[];
  onChipRemove: (uid: string) => void;
};

const UserChipsList = ({ data, onChipRemove }: UserChipsListProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      style={styles.chipsListContainer}
      contentContainerStyle={styles.chipsListContentContainer}
      keyExtractor={(item) => item.uid}
      renderItem={({ item, index }) => (
        <UserChip
          username={item.username}
          photoURL={item.photoURL}
          onChipRemove={onChipRemove.bind(this, item.uid)}
          style={{
            marginRight: index !== data.length - 1 ? 10 : 0,
          }}
        />
      )}
    />
  );
};

export default UserChipsList;
