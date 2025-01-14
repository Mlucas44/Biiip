import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export const Button = ({
  title = "button",
  disabled = false,
  withIcon = false,
  onPress = () => { }
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Classes de base pour le conteneur du bouton
  let baseClasses = "h-10 rounded-3xl flex-row items-center justify-center";

  // Gestion de la couleur de fond et du padding en fonction de l'état
  if (disabled) {
    baseClasses += " bg-neutrals-grey-500 px-12";
  } else if (isPressed) {
    baseClasses += " bg-brand-darkBlue-700 px-12";
  } else if (isHovered) {
    baseClasses += " bg-brand-darkBlue-600 px-12";
  } else {
    baseClasses += " bg-brand-darkBlue-500-main px-12";
  }

  // Ajustement du padding si présence d’une icône
  if (withIcon && !disabled) {
    // Remplace px-12 par pl-12 pr-8
    baseClasses = baseClasses.replace("px-16", "pl-12 pr-8");
  }

  return (
    <Pressable
      className={baseClasses}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      // Ces props fonctionnent uniquement sur React Native Web :
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <Text className="text-neutrals-blackWhite-White text-base font-medium font-['Gabarito'] leading-normal">
        {title}
      </Text>
      {withIcon && (
        <View className="ml-4 w-5 h-5 items-center justify-center" />
      )}
    </Pressable>
  );
};
