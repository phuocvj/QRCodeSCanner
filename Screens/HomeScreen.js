import React,{useEffect} from 'react';
import {
    useToken,
    NativeBaseProvider,
    Center,
    Text,
    Box,
    HStack,
    Image,
    Stack,
    ScrollView,
    Heading,
    Button,
    Pressable,
    Fab,
    Icon,
    Divider,
    VStack,
    View,
} from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// StyleSheets
import globalStyles from "../components/styles/globalStyles";
// Components
import Slider from "../components/Slider/Slider";
import { Touchable, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';
const Tab = createBottomTabNavigator();
function HomeScreenInfo() {
    const HandleAutoUpdate= async()=> {
        try {
           console.log("bat dau check update");
          const update = await Updates.checkForUpdateAsync();
          
          if (update.isAvailable) {
            console.log("New Updates!!");
            await Updates.fetchUpdateAsync();
            // ... thông báo cho người dùng về bản cập nhật ...
            await Updates.reloadAsync();
          } else {
            // No Update Available...
            console.log("No Update Available");
          }
         
        } catch (e) {
            console.log(e);
          // xử lí lỗi.
          // thường thì sẽ vào đây khi ứng dụng không thể kết nối đến internet.
        }
      };
    return (
        // <View>
        //     <Button onPress={HandleAutoUpdate}>Check for Update</Button>
        // </View>
        <Slider />
    )
}

export default function HomeScreen({ navigation }) {
    const HandleAutoUpdate= async()=> {
        try {
            console.log("bat dau check update");
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            console.log("New Updates!!");
            await Updates.fetchUpdateAsync();
            // ... thông báo cho người dùng về bản cập nhật ...
            await Updates.reloadAsync();
          } else {
            // No Update Available...
            console.log("No Update Available");
          }
         
        } catch (e) {
          // xử lí lỗi.
          // thường thì sẽ vào đây khi ứng dụng không thể kết nối đến internet.
        }
      };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            HandleAutoUpdate();

        });
        return unsubscribe;
    }, [navigation])
    return (
        <Tab.Navigator
            initialRouteName="homescreen"
            activeColor="#fff"
        >
            <Tab.Screen name="homescreen"
                onPress={() => navigation.navigate('Scan')}
                options={{
                    headerShown:false,
                    tabBarShowLabel:false,
                    tabBarStyle:{
                        // backgroundColor:"#ffffff",
                        // bottom:15,
                        // left:10,
                        // right:10,
                       // position:"absolute",
                         height:70,
                        // borderRadius:20,
                    },
                    tabBarLabelStyle: {
                        fontSize: 10,
                        color: "yellow",
                      },
                    tabBarIcon: ({ color }) => (
                        <TouchableOpacity
                        backgroundColor="red.500"
                            style={{
                                bottom: 2, // space from bottombar
                                position:"absolute",
                                backgroundColor: "red.500"
                            }}
                            onPress={() => navigation.navigate('Scan')}
                        >
                            <Button
                                borderWidth="5"
                                borderColor="white"
                                colorScheme='green'
                                onPress={() => navigation.navigate('Scan')}
                                leftIcon={<Icon as={Ionicons} name="qr-code-outline" size="lg"
                                    onPress={() => navigation.navigate('Scan')}
                                />}
                                shadow={9}
                                borderRadius={50} size="80px"
                            ></Button>
                        </TouchableOpacity>
                    )
                }}
                component={HomeScreenInfo} />
        </Tab.Navigator>
    );
}

