import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";

const About = () => {
  return (
    <View style={styles.container}>
      <Text>About Page</Text>
      <Link href="/" style={styles.link}>
        Back home
      </Link>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    margin: 48,
  },
  goCard: {
    backgroundColor: "#eee",
    padding: 24,
    borderRadius: 4,
    boxShadow: "4px 4px rgba(0,0,0,0.1)",
  },
  link: {
    borderBottomWidth: 1,
  },
});
