import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { ConversationService } from '@/api/services/ConversationService';

export const useDeleteConversation = (options?: UseMutationOptions<unknown, unknown, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ConversationService.deleteConversation(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['conversations', 1, 20] });

      const previousConversations = queryClient.getQueryData(['conversations', 1, 20]);

      queryClient.setQueryData(['conversations', 1, 20], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          conversations: old.conversations.filter((conv: any) => conv.id !== id),
        };
      });

      return { previousConversations };
    },

    onError: (err, id, context: any) => {
      queryClient.setQueryData(['conversations', 1, 20], context?.previousConversations);
      options?.onError?.(err, id, context);
    },

    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },

    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['conversations', 1, 20] });
      options?.onSettled?.(data, error, variables, context);
    },

    ...options,
  });
};
