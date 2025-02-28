import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPaginatedComments = async ({ pageParam = 1, postID }: { pageParam?: number; postID: string }) => {
    const response = await fetch(`https://pixil-server-production.up.railway.app/comments/${postID}?page=${pageParam}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
};

export function usePaginatedCommentsByPostID(postID: string) {
    return useInfiniteQuery({
        queryKey: ['comments', postID], // Include postID in the query key
        queryFn: ({ pageParam }) => fetchPaginatedComments({ pageParam, postID }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });
}