import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployees, deleteEmployee } from '@/lib/api';
import { ASSETS_QUERY_KEY } from './useAssets';

export const EMPLOYEES_QUERY_KEY = ['employees'];

export function useEmployees() {
    return useQuery({
        queryKey: EMPLOYEES_QUERY_KEY,
        queryFn: getEmployees,
    });
}

export function useDeleteEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteEmployee(id),
        onSuccess: () => {
            // Invalidate both employees and assets since deleting an employee cascades to assets
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEY });
        },
    });
}
