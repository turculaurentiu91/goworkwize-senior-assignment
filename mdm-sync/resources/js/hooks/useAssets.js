import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAssets, deleteAsset } from '@/lib/api';

export const ASSETS_QUERY_KEY = ['assets'];

export function useAssets() {
    return useQuery({
        queryKey: ASSETS_QUERY_KEY,
        queryFn: getAssets,
    });
}

export function useDeleteAsset() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteAsset(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEY });
        },
    });
}
