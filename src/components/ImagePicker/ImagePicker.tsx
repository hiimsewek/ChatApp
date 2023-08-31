import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { ThemeContext } from "contexts";
import * as ExpoImagePicker from "expo-image-picker";

type ImagePickerProps = {
  size: number;
  onImageSelected: (img: string) => void;
  disabled?: boolean;
};

const ImagePicker = ({ size, onImageSelected, disabled }: ImagePickerProps) => {
  const [image, setImage] = useState<string | null>(null);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <Pressable onPress={pickImage} disabled={disabled}>
      {image ? (
        <Avatar.Image size={size} source={{ uri: image }} />
      ) : (
        <Avatar.Icon
          size={size}
          icon="camera-plus"
          color={colors.onSurfaceVariant}
          style={{
            backgroundColor: colors.surfaceVariant,
          }}
        />
      )}
    </Pressable>
  );
};

export default ImagePicker;
