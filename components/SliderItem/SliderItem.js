import React from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";

// StyleSheets
import globalStyles from "../../components/styles/globalStyles";
import sliderItemStyle from "../../components/styles/SliderItemStyles";

const SliderItem = ({ item }) => {
    // Extract styles from styleSheets
    const { container } = globalStyles,
        { title, sliderImage, flexViewHalf, sliderItem } = sliderItemStyle;

    // Get window width and height
    const { width } = useWindowDimensions();

    return (
        <View style={[container, sliderItem, { width }]}>
            {/* Slider Image */}
            <Image
                resizeMode='contain'
                source={item.images}
                style={[sliderImage, { width }]}
            />

            {/* Slider Title */}
            <View style={flexViewHalf}>
                <Text style={title}>{item.title}</Text>
            </View>
        </View>
    );
};

export default SliderItem;
