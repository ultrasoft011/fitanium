import type { PropsWithChildren, ReactElement } from "react";
import { Text, StyleSheet, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";

import { ThemedView } from "./ThemedView";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  tmb: string | null;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  tmb,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
        ]}
      >
        {headerImage}
        {tmb && <Text style={styles.headerText}>TMB: {tmb} kcal/día</Text>}
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT, // Deja espacio para el header sticky
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
});
