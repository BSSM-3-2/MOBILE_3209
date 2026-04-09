import { FlatList } from 'react-native';
import { Post } from '@type/Post';
import { SwipeableFeedPost } from './post/SwipeableFeedPost';
import { useFeedStore } from '@/store/feed-store';

function FeedList({
    posts,
    onEndReached,
}: {
    posts: Post[];
    onEndReached?: () => void;
}) {
    const { removePost } = useFeedStore();

    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <SwipeableFeedPost post={item} onDelete={removePost} />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
}

export { FeedList };
