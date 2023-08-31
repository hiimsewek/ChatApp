import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStoredItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const storeItem = async (key: string, item: string) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    console.error(e);
  }
};

export const removeStoredItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
