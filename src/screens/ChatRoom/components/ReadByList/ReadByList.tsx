import { View } from "react-native";
import React, { useContext } from "react";
import { Avatar, Badge } from "react-native-paper";
import styles from "./styles";
import { ThemeContext } from "contexts";
import { User } from "types";
import { processReadByData } from "./helpers";

type ReadByListProps = {
  readBy: User[];
};
const ReadByList = ({ readBy }: ReadByListProps) => {
  const { usersToDisplay, others } = processReadByData(readBy);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    readBy.length > 0 && (
      <View style={styles.readByListContainer}>
        {usersToDisplay.map((el) => {
          return (
            <Avatar.Image
              size={20}
              source={{ uri: el.photoURL }}
              key={el.uid}
              style={styles.avatarSpacing}
            />
          );
        })}
        {others > 0 && (
          <Badge
            size={20}
            style={[
              styles.othersText,
              {
                backgroundColor: colors.secondary,
              },
            ]}
          >{`+${others}`}</Badge>
        )}
      </View>
    )
  );
};

export default ReadByList;
