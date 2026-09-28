// import { Ionicons } from "@expo/vector-icons";
// import Entypo from '@expo/vector-icons/Entypo';
// import { Drawer } from "expo-router/drawer";


// export default function DrawerLayout() {
//     return <Drawer
//         //drawerActiveTintColor is used to change the color of active item in drawer menu
//         //drawerInactiveTintColor jo active ni un ka color chng
//         screenOptions={{
//             drawerActiveTintColor: "black",
//             drawerInactiveTintColor: "blue",
//             drawerLabelStyle: {
//                 marginLeft: 20,
//                 fontSize: 16,
//                 fontWeight: "bold",
//             },
//             headerStyle: {
//                 backgroundColor: "lightblue",
//             },
//             headerTitleStyle: {
//                 fontWeight: "bold",
//                 fontSize: 20,
//                 color: "yellow",
//             },
//             headerTitleAlign: "center",
//             headerTintColor: "red",
//             drawerStyle: {
//                 //dy drawer menu ka background color change krne ke liye
//                 backgroundColor: "lightblue",
//                 width: 240,
//             },
//             // drawerIcon: ({ color, size }) => (
//             // idr b hm apna icon use kr skty hain but hmne har screen k liye alag alag icon use krna hai isliye hmne screen ke andar hi icon define kiya hai
//             // )
//             swipeEnabled: true, // Enable swipe gesture to open the drawer
//         }}>
//         <Drawer.Screen name="index" options={{
//             title: "Home", drawerLabel: "Home Screen ", drawerIcon: ({ color, size }) => {
//                 return (
//                     <Entypo name="home" size={24} color="black" />
//                 );
//             }
//         }}
//         />
//         <Drawer.Screen name="profile" options={{
//             title: "Profile", drawerLabel: "Profile Screen ",
//             drawerIcon: ({ color, size }) => (
//                 <Ionicons name="person-outline" color={color} size={size} />
//             ),
//         }} />
//         <Drawer.Screen name="setting" options={{
//             title: "Settings", drawerLabel: "Settings Screen ", drawerIcon: ({ color, size }) => (
//                 <Ionicons name="settings-outline" color={color} size={size} />
//             ),
//         }} />
//     </Drawer>;
// }//title is for page tiltle an label for to shown on drawer menu

import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";

export default function Layout() {
    return (
        <Drawer
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerStyle: {
                    backgroundColor: "lightblue",
                },
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />

            <Drawer.Screen
                name="profile"
                options={{
                    title: "Profile",
                }}
            />

            <Drawer.Screen
                name="setting"
                options={{
                    title: "Settings",
                }}
            />
        </Drawer>
    );
}