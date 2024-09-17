import React from "react";
import { View, Text, TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  title: string; // Agregamos una prop para el título
};

export function ThemedInput({
  style,
  lightColor = "white",
  darkColor = "white",
  title,
  value,
  onChangeText,
  ...otherProps
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const titleColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <View style={style}>
      <Text style={{ color: titleColor, marginBottom: 5 }}>{title}</Text>
      <TextInput
        style={[
          { backgroundColor, color: "black", padding: 10, borderRadius: 5 },
        ]}
        value={value}
        onChangeText={onChangeText}
        {...otherProps}
      />
    </View>
  );
}
