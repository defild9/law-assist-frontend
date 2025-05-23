import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import {
  CollectionsWithFilesResponse,
  VectorStoreCollectionsResponse,
} from '@/api/types/vectore-store-collection';
import { VectorStoreService } from '@/api/services/VectoreStoreService';

export const useVectorStoreCollections = (
  options?: UseQueryOptions<VectorStoreCollectionsResponse>
) => {
  return useQuery<VectorStoreCollectionsResponse>({
    queryKey: ['vectorStoreCollections'],
    queryFn: () => VectorStoreService.getAllCollections(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useVectorStoreCollectionsWithFiles = (
  searchQuery?: string,
  page?: number,
  limit?: number,
  options?: UseQueryOptions<CollectionsWithFilesResponse>
) => {
  return useQuery<CollectionsWithFilesResponse>({
    queryKey: ['vectorStoreCollectionsWithFiles', { searchQuery, page, limit }],
    queryFn: () => VectorStoreService.getAllCollectionWithFilesData(searchQuery, page, limit),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateCollection = (options?: UseMutationOptions<any, unknown, string>) => {
  return useMutation<any, unknown, string>({
    mutationFn: (collectionName: string) => VectorStoreService.createCollection(collectionName),
    ...options,
  });
};

export const useDeleteCollection = (options?: UseMutationOptions<any, unknown, string>) => {
  return useMutation<any, unknown, string>({
    mutationFn: (collectionName: string) => VectorStoreService.deleteCollection(collectionName),
    ...options,
  });
};

export const useDeleteFileFromCollection = (
  options?: UseMutationOptions<any, unknown, { collectionName: string; fileName: string }>
) => {
  return useMutation<any, unknown, { collectionName: string; fileName: string }>({
    mutationFn: ({ collectionName, fileName }) =>
      VectorStoreService.deleteFileFromCollection(collectionName, fileName),
    ...options,
  });
};

export const useUploadFileToCollection = (
  options?: UseMutationOptions<any, unknown, { file: File; collectionName: string }>
) => {
  return useMutation<any, unknown, { file: File; collectionName: string }>({
    mutationFn: ({ file, collectionName }) =>
      VectorStoreService.uploadFileToCollection(file, collectionName),
    ...options,
  });
};
