import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#88898b"
                },
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: "bold",
                },
                animation: "shift",
                headerTintColor: "#fff",
                sceneStyle: {
                    backgroundColor: "#88898b"
                }
            }}

            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: "Home", tabBarLabel: "Home", tabBarBadge: "5" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", tabBarLabel: "Profile" }} />
            <Tabs.Screen name="setting" options={{ title: "Settings", tabBarLabel: "Settings" }} />
        </Tabs>
    );
}