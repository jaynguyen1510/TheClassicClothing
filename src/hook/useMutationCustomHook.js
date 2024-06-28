import { useMutation } from '@tanstack/react-query';

export const useMutationCustomHook = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    });
    return mutation
}
