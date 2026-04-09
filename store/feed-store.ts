import { create } from 'zustand';
import { Post } from '@type/Post';
import { getFeed } from '@/api/content';

interface FeedState {
    posts: Post[];
    page: number;
    hasNext: boolean;
    loading: boolean;
    error: string | null;

    fetchFeed: () => Promise<void>;
    loadMore: () => Promise<void>;
    toggleLike: (postId: string) => Promise<void>;
    removePost: (postId: string) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
    posts: [],
    page: 1,
    hasNext: false,
    loading: false,
    error: null,

    fetchFeed: async () => {
        set({ loading: true, error: null });
        try {
            const { data, pagination } = await getFeed(1);
            set({
                posts: data,
                page: 1,
                hasNext: pagination.hasNext,
                loading: false,
            });
        } catch (e) {
            set({ error: '피드를 불러오지 못했습니다.', loading: false });
        }
    },

    loadMore: async () => {
        const { loading, hasNext, page, posts } = get();
        if (loading || !hasNext) return;

        set({ loading: true });
        try {
            const nextPage = page + 1;
            const { data, pagination } = await getFeed(nextPage);
            set({
                posts: [...posts, ...data],
                page: nextPage,
                hasNext: pagination.hasNext,
                loading: false,
            });
        } catch (e) {
            set({ loading: false });
        }
    },

    toggleLike: async (postId: string) => {
        const { posts } = get();
        set({
            posts: posts.map(p =>
                p.id === postId
                    ? {
                          ...p,
                          liked: !(p.liked ?? false),
                          likes: p.liked ? p.likes - 1 : p.likes + 1,
                      }
                    : p,
            ),
        });
    },

    removePost: () => {},
}));
