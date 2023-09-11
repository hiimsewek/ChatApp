import { auth } from "services/firebaseConfig";
import { User } from "types";

export const processReadByData = (readBy: User[]) => {
  const avatarsToDisplay = 10;

  const readByWithoutCurrentUser = readBy.filter(
    (el) => el.uid !== auth.currentUser.uid
  );

  const usersToDisplay = readByWithoutCurrentUser.slice(0, avatarsToDisplay);
  const others = readByWithoutCurrentUser.length - usersToDisplay.length;

  return { usersToDisplay, others };
};
