import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPaginatedPosts = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://pixil-server-production.up.railway.app/posts?page=${pageParam}`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
};

export function usePaginatedPosts() {
    return useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: fetchPaginatedPosts,
        initialPageParam: 1, // ✅ Required property
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });
}
