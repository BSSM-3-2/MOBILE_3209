import { StyleSheet } from 'react-native';
import { Post } from '@type/Post';
import ContentContainer from '@components/container';
import { FeedPostHeader } from './FeedPostHeader';
import { FeedPostActions } from './FeedPostActions';
import { FeedPostCaption } from './FeedPostCaption';
import { ThemedView } from '@components/themed-view';
import FeedImage from '@components/feed/post/FeedImage';
import { resolveImageSource } from '@/utils/image';
import { useFeedStore } from '@/store/feed-store';

function FeedPost({ post }: { post: Post }) {
    const user = post.author;
    const { posts } = useFeedStore();

    if (!user) return null;

    return (
        <ThemedView style={styles.feedMargin}>
            <FeedPostHeader user={user} />
            <FeedImage image={resolveImageSource(post.images[0])} />
            <ContentContainer style={{ gap: 4 }}>
                <FeedPostActions
                    postId={post.id}
                    initialLikes={posts.find(item => item.id === post.id)?.likes ?? post.likes}
                    initialLiked={posts.find(item => item.id === post.id)?.liked ?? post.liked}
                    commentCount={post.commentCount ?? post.comments.length}
                />
                <FeedPostCaption
                    username={user.username}
                    caption={post.caption}
                    timestamp={post.timestamp}
                />
            </ContentContainer>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    feedMargin: {
        marginBottom: 20,
    },
});

export { FeedPost };
