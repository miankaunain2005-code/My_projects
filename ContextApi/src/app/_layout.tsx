import { Slot } from "expo-router";
import CountProvider from "./contextapi/CountContex";

export default function Layout() {
  return (
    <CountProvider>
      <Slot />
    </CountProvider>
  );
}