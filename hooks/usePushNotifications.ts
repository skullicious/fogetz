import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
      shouldShowList: false,
      shouldShowBanner: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();
  console.log(expoPushToken, "EPT");
  console.log(notification, "NOTIFICATION");

  const notificationListener = useRef<Notifications.Subscription>(null);
  const responseListener = useRef<Notifications.Subscription>(null);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      console.log("Is device!");
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      console.log("Existing status: ", existingStatus);
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      console.log("Final status: ", finalStatus);
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      alert(`project Id: ${Constants.expoConfig?.extra?.eas.projectId}`);

      try {
        token = await Notifications.getExpoPushTokenAsync({
          projectId:
            Constants.expoConfig?.extra?.eas.projectId ??
            Constants.easConfig?.projectId,
        });

        alert(`token?: ${token}`);
      } catch (error: any) {
        console.log("Error in getting expo token: ", error);
      }

      console.log("token in reg", token);
    } else {
      alert("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    console.log("UseEffect triggering");
    registerForPushNotificationsAsync().then((token: any) => {
      console.log("registring expo push token: ", token);
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
