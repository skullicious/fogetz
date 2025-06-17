import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";
import Button from "../components/ui/button";

const Home = () => {
  const messageHandler = async () => {
    try {
      const res = await fetch("http://10.0.2.2:3000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "test" }),
      });
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOGETZ</Text>
      <Text>What?</Text>
      <Text>Where?</Text>
      <Text>When?</Text>

      <View style={styles.goCard}>
        <Button styles={styles} onPress={messageHandler}>
          <Text>Go!</Text>
        </Button>

        <Link href="/about" style={styles.link}>
          To about page
        </Link>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  goButton: {
    backgroundColor: "red",
    color: "white",
  },
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
