import { useEffect, useState } from "react";
import { auth } from "services/firebaseConfig";
import { usersIndex } from "services/algolia";
import { User, UserWithoutUid } from "types";

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [typedText, setTypeText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const changeTextHandler = (text: string) => {
    setTypeText(text);
  };

  const clearTextHandler = () => {
    setTypeText("");
  };

  const clearSearchData = () => {
    setUsers(null);
    setTypeText("");
  };

  useEffect(() => {
    if (!typedText) return;

    let ignore = false;

    const searchUser = async () => {
      try {
        setIsSearching(true);

        const { hits } = await usersIndex.search<UserWithoutUid>(typedText, {
          exactOnSingleWordQuery: "word",
          filters: `NOT objectID: ${auth.currentUser.uid}`,
        });

        const foundUsers = [];

        hits.forEach((hit) => {
          const data: User = {
            uid: hit.objectID,
            username: hit.username,
            photoURL: hit.photoURL,
          };
          foundUsers.push(data);
        });

        if (!ignore) {
          setUsers(foundUsers);
        }
      } catch (e) {
        if (e) {
          setUsers([]);
        }
      } finally {
        setIsSearching(false);
      }
    };

    searchUser();

    return () => {
      ignore = true;
    };
  }, [typedText]);

  return {
    typedText,
    users,
    changeTextHandler,
    clearTextHandler,
    clearSearchData,
    isSearching,
  };
};

export default useSearchUsers;
