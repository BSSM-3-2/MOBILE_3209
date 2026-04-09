import { Image, ImageLoadEventData } from 'expo-image';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FeedImage({
    image,
}: {
    image: ImageSourcePropType;
    onDoubleTap?: () => void;
}) {
    const [imageHeight, setImageHeight] = useState(SCREEN_WIDTH);

    const handleImageLoad = (e: ImageLoadEventData) => {
        const { width, height } = e.source;
        const ratio = height / width;
        setImageHeight(SCREEN_WIDTH * ratio);
    };

    return (
        <Image
            source={image}
            style={[styles.container, { width: SCREEN_WIDTH, height: imageHeight }]}
            onLoad={handleImageLoad}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
