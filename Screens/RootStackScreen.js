import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  FormControl,
  Input,
  NativeBaseProvider,
  TextArea,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import ScanQRScreen from "./ScanQRScreen";

const Stack = createNativeStackNavigator();

export default function RootStackScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setfeedback] = useState('')
  const handleSendClick=()=>{
    alert(feedback);
    setShowModal(false);
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: "QR Location Scanner",
              // headerRight: () => (
              //   <Button onPress={() => setShowModal(true)} color="#fff">
              //     FeedBack
              //   </Button>
              // ),
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ title: "QR Code" }}
            name="Scan"
            component={ScanQRScreen}
          />
        </Stack.Navigator>

        <Modal
          avoidKeyboard
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Your Feedback</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Ý kiến góp ý</FormControl.Label>
                <TextArea value={feedback} onChangeText={setfeedback} />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  onPress={handleSendClick}>
                  Gửi
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
