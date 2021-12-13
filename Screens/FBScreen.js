import { View,Button,Text } from "native-base";

export default function FeedbackScreen({ navigation }) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Feedback</Text>
        <Button
          title="Go to Home"
        />
      </View>
    )
}