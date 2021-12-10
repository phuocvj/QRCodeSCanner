import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Button, Icon, Image, Stack, Center, useToast,Box } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import { Audio } from "expo-av";
import Ping from 'react-native-ping';
const { width } = Dimensions.get('window')
const qrSize = width * 0.7
export default function ScanQRScreen() {
  const [netState, setnetState] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [sound, setSound] = useState();
  const [status, setstatus] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      fetch("http://172.30.10.117:9000/")
        .then((response) => {
          setnetState(response.status === 200)
          console.log("net state: ", netState);
        })
        .catch((error) => { 
          console.log('network error: ' + error);
        })
    })();
    
  }, []);
  const toast = useToast();


  const handleBarCodeScanned = ({ type, data }) => {
   
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data);
    //Xu ly o day
    playSound();
    var n = data.includes("*");
    if (n) {
      //alert("Hãy bỏ mã hóa QR code trên ứng dụng trước.");

      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              Hãy bỏ mã hóa QR code trên ứng dụng trước.
            </Box>
          );
        },
      });
    } else {
      var Ardata = data.split(/[ |]+/);
      let UserID = Ardata[0];
      if (isNaN(UserID)) { //Input is not a number
        toast.show({
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Đây không phải là QR của PC Covid.
              </Box>
            );
          },
        });
      }
      else //Is a number
      {
        if (netState){
          console.log("respone: " ,netState);
          // console.log(UserID);
          SaveData2Ora(UserID, data);
          console.log("trang thai: ", status);
        }else{
          Alert.alert("Lỗi Wifi hoặc tín hiệu mạng!","Mất kết nối với máy chủ!");
        }
      }
    };
  };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    async function playSound() {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(require("../assets/qr.mp3"));
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }
    //=====================
    function SaveData2Ora(UserId, Data) {
      let status = '';
      const formData = new URLSearchParams();
      formData.append("User_Info", "VJ");
      formData.append("User_Info", "admin");
      formData.append("User_Info", "P");
      formData.append("User_Info", "");
      formData.append("User_Info", "0");
      formData.append(
        "StrQry",
        "INSERT INTO MSPD_QR_SCAN(SERVICE_CODE, USER_ID, QR_CODE, REG_USER, REG_DATE)\
     SELECT 'VJ','" + UserId + "','" + Data + "','QRScanner', SYSDATE FROM DUAL"
      );
      let data = {
        method: "POST",
        body: formData.toString(),
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // 'Access-Control-Allow-Origin': '*'
        },
      };

      fetch("http://172.30.10.9//POP_WebService/OraPKG.asmx/Ora_Modify", data)

        .then((response) => response.text())
        .then((response) => {
          // console.log(response);
          if (response.includes("ORA-00001")) {
            //setstatus("D");
            status = "D";
            //console.log("D");
          } else {
            status = "O";
            //setstatus("O");
            // console.log("OK");
          }
          console.log("tatus:", status);
          if (status !== "") {
            if (status == "O") {
              toast.show({
                render: () => {
                  return (
                    <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                      Scan thành công!! Mã định danh của bạn là: {UserId}
                    </Box>
                  );
                },
              });
            } else if (status == "D") {
              toast.show({
                render: () => {
                  return (
                    <Box bg="red.800" px="2" py="1" rounded="sm" mb={5}>
                      QR này đã tồn tại trên hệ thống!!
                    </Box>
                  );
                },
              });
            } else if (status == "E") {
              Alert.alert("Lỗi mạng!","Không lưu được, mất kết nối với máy chủ!");
            } else {
              toast.show({
                render: () => {
                  return (
                    <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                      Hãy scan lại!!
                    </Box>
                  );
                },
              });
            }
          }
        })
        .catch((err) => {
          status = "E";
          console.log("fetch", err);
        });
    }
    return (
      <View style={styles.container}>
        
        <Camera type={type} ratio={"16:9"}
          style={[StyleSheet.absoluteFill, styles.container]}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={netState? scanned ? undefined : handleBarCodeScanned:undefined}
        >
          <Center><Image
            style={styles.qr}
            alt="Không có mạng!"
            source={require('../assets/img/qr.png')}
          /></Center>

        </Camera>
        {!netState? (
          <Button bgColor="red.600">Network Error!</Button>
        ):null}
        {scanned && (
          <Button leftIcon={<Icon as={Ionicons} name="refresh-outline" size="md"
          />} bgColor="green.400" onPress={() => setScanned(false)}>
            "Nhấn để Scan lại"
          </Button>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    qr: {
      marginTop: '20%',
      marginBottom: '20%',
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.09,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    cancel: {
      fontSize: width * 0.05,
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
  });
