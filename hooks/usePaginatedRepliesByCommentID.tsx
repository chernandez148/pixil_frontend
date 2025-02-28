import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPaginatedReplies = async ({ pageParam = 1, commentID }: { pageParam?: number; commentID: string }) => {

    const response = await fetch(`https://pixil-server-production.up.railway.app/comments/${commentID}/replies?page=${pageParam}`);

    if (response.status === 404) {
        return { replies: [], nextPage: undefined }; // Return an empty array for no replies
    }

    if (!response.ok) throw new Error("Failed to fetch replies");
    return response.json();
};

export function usePaginatedRepliesByCommentID(commentID: string) {
    return useInfiniteQuery({
        queryKey: ['replies', commentID], // Include commentID in the query key
        queryFn: ({ pageParam }) => fetchPaginatedReplies({ pageParam, commentID }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    });
}