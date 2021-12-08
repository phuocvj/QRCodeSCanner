import React from 'react';
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

const Tab = createBottomTabNavigator();
function HomeScreenInfo() {
    return (
        // <Center flex={1}
        //     _light={{ backgroundColor: 'gray.300' }}
        //     _dark={{ backgroundColor: 'gray.700' }}
        // >
        //     <Stack
        //         rounded="lg"
        //         overflow="hidden"
        //         width="90%"
        //         height="90%"
        //         shadow={9}
        //         _light={{ backgroundColor: 'coolGray.50' }}
        //         _dark={{ backgroundColor: 'gray.700' }}>
        //         <ScrollView>
        //             <Box>
        //                 <Image
        //                     w="100%"
        //                     h={200}
        //                     source={require("./images/pc-covid.jpg")}
        //                     alt="image"
        //                 />
        //                 <Center flex={1}
        //                     bg="violet.500"
        //                     _text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
        //                     position="absolute"
        //                     bottom="0"
        //                     px="3"
        //                     py="1.5">
        //                     PHOTOS
        //                 </Center>
        //             </Box>
        //             <Stack p="4" space={1}>
        //                 <Stack space="2">
        //                     <Heading size="md" ml="-1">
        //                         Hướng dẫn
        //                     </Heading>
        //                     <Text
        //                         fontSize="xs"
        //                         color="violet.500"
        //                         fontWeight="500"
        //                         ml="-0.5"
        //                         mt="-1">
        //                         QR Covid Scanner.
        //                     </Text>
        //                 </Stack>
        //                 <Text fontWeight="400">
        //                     Hãy bấm vào QR code trên PC Covid để mở khóa thông tin và sử dụng ứng dụng này để quét mã QR đó.
        //                 </Text>
        //                 <Divider />
        //             </Stack>
        //             <VStack space={2}
        //             >
        //             </VStack>
        //         </ScrollView>
        //     </Stack>
        // </Center>
        <Slider />
    )
}
const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    style: { backgroundColor: 'white' },
}
export default function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName="homescreen"
            activeColor="#fff"
            screenOptions={customTabBarStyle}
            shifting="false"
        >
            <Tab.Screen name="homescreen"
                
                options={{
                    headerShown:false,
                    tabBarLabel: 'Scan QR'.toUpperCase(),
                    
                    tabBarLabelStyle: {
                        fontSize: 20,
                      },
                    tabBarIcon: ({ color }) => (
                        <Pressable
                            style={{
                                bottom: 0, // space from bottombar
                                position: 'absolute',
                            }}
                            onPress={() => navigation.navigate('Scan')}
                        >
                            <Button colorScheme="green"
                                borderWidth="5"
                                borderColor="white"
                                onPress={() => navigation.navigate('Scan')}
                                leftIcon={<Icon as={Ionicons} name="qr-code-outline" size="lg"
                                    onPress={() => navigation.navigate('Scan')}
                                />}
                                borderRadius={50} size="80px"
                            ></Button>
                        </Pressable>
                    )
                }}
                component={HomeScreenInfo} />
        </Tab.Navigator>
    );
}

