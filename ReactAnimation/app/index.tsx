// // import LoadingAnimation from "@/app/assets/lottie/loading.json";
// import LottieView from "lottie-react-native";
// import { useEffect, useRef } from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// export default function Index() {

//   const animationRef = useRef<LottieView>(null);

//   const onPress = () => {
//     <LottieView source={require("@/app/assets/lottie/bookmark.json")} />

//   }

//   useEffect(() => {
//     animationRef.current?.play();

//     // Or set a specific startFrame and endFrame with:
//     animationRef.current?.play(10, 30);
//   }, []);
//   return (
//     <View
//       style={styles.container}>
//       <TouchableOpacity onPress={onPress}>
//         <LottieView ref={animationRef} source={require("@/app/assets/lottie/loading.json")} style={{ width: 500, height: 500 }}
//           autoPlay
//         />
//       </TouchableOpacity>

//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   }
// })
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const onPress = () => {
    router.push("/Secon")

  }
  return (
    <View style={styles.container}>

      {/* TOP LOADING ANIMATION */}
      <View style={styles.topBox}>
        <LottieView
          source={require("@/app/assets/lottie/loading.json")}
          autoPlay
          loop
          style={styles.loadingAnim}
        />
      </View>

      {/* MAIN CARD */}
      <View style={styles.card}>

        {/* SUCCESS / FEATURE ANIMATION */}
        <LottieView
          source={require("@/app/assets/lottie/sucess.json")}
          autoPlay
          style={styles.successAnim}
        />

        <Text style={styles.title}>Welcome Kaunain 🚀</Text>

        <Text style={styles.subtitle}>
          First Animation Screen
        </Text>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </View>

      {/* BOTTOM SMALL FLOAT ANIMATION */}
      <View style={styles.bottomBox}>
        <LottieView
          source={require("@/app/assets/lottie/rocket.json")}
          autoPlay
          loop
          style={styles.rocketAnim}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0d1b",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
  },

  topBox: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingAnim: {
    width: 200,
    height: 200,
  },

  card: {
    width: "90%",
    backgroundColor: "#111C33",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
  },

  successAnim: {
    width: 180,
    height: 180,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#AAB4C8",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomBox: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  rocketAnim: {
    width: 90,
    height: 90,
  },
});