import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface ButtonProps {
  children: any;
  onPress: () => void;
  styles: any;
}

const Button = ({ children, onPress, styles }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.goButton]}
    >
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
