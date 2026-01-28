import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncJamf } from '@/lib/api';
import { ASSETS_QUERY_KEY } from './useAssets';
import { EMPLOYEES_QUERY_KEY } from './useEmployees';

export function useSyncJamf() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: syncJamf,
        onSuccess: () => {
            // Invalidate both assets and employees after sync
            queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY });
        },
    });
}
