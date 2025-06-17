import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../constants/colors";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <>
      <StatusBar />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: "#333",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
      <Text>Footer</Text>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
