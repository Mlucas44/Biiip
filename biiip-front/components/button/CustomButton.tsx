import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleProp, ViewStyle, Platform } from 'react-native';
import { BUTTON_VARIANTS } from './ButtonVariants';

interface CustomButtonProps {
  title: string;
  onPress?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success';
  disabled?: boolean;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
  iconSize?: number;
  iconColor?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  Icon,
  iconSize = 20,
  iconColor,
  loading = false,
  className = '',
  textClassName = '',
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const currentVariant = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;

  // Déterminer la classe de conteneur en fonction de l'état
  let containerClass = currentVariant.container;

  if (disabled) {
    containerClass = 'bg-gray-400';
  } else if (isPressed) {
    containerClass = currentVariant.pressed;
  } else if (isHovered) {
    containerClass = currentVariant.hover;
  }

  // Handlers pour les événements
  const handleMouseEnter = () => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(false);
    }
  };

  const handlePressIn = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      setIsPressed(false);
    }
  };

  return (
    <TouchableOpacity
      className={`${containerClass} flex-row items-center justify-center py-2 px-12 rounded-3xl ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />
      ) : (
        <View className="flex-row items-center">
          {Icon && <Icon size={iconSize} color={iconColor || 'white'} style={{ marginRight: 8 }} />}
          <Text className={`${currentVariant.text} ${textClassName}`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
