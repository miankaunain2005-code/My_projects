// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     //expo router working
//     // <Stack >
//     //   <Stack.Screen name="(tabs)" />
//     //   <Stack.Screen name="index" />
//     //   <Stack.Screen name="about" />
//     // </Stack>
//   );
// }


//     //mmkv working
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
