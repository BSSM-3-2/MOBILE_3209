import { View, StyleSheet } from 'react-native';
import { Post } from '@type/Post';
import { FeedPost } from './FeedPost';

function SwipeableFeedPost({
    post,
}: {
    post: Post;
    onDelete: (id: string) => void;
}) {
    return (
        <View style={styles.container}>
            <FeedPost post={post} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        position: 'relative',
    },
});

export { SwipeableFeedPost };
