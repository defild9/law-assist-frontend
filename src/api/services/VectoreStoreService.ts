import {
  CollectionsWithFilesResponse,
  VectorStoreCollectionsResponse,
} from '../types/vectore-store-collection';
import axiosInstance from '..';

export class VectorStoreService {
  public static async getAllCollections(): Promise<VectorStoreCollectionsResponse> {
    const res = await axiosInstance.get('/bot-vector-store');
    return res.data;
  }
  public static async getAllCollectionWithFilesData(
    search?: string,
    page?: number,
    limit?: number
  ): Promise<CollectionsWithFilesResponse> {
    const params = {
      ...(search && { search }),
      ...(page && { page }),
      ...(limit && { limit }),
    };
    const res = await axiosInstance.get('/bot-vector-store/collections-with-files', { params });
    return res.data;
  }

  public static async createCollection(collectionName: string): Promise<any> {
    const res = await axiosInstance.post('/bot-vector-store', { collectionName });
    return res.data;
  }

  public static async deleteCollection(collectionName: string): Promise<any> {
    const res = await axiosInstance.delete(
      `/bot-vector-store/${encodeURIComponent(collectionName)}`
    );
    return res.data;
  }

  public static async deleteFileFromCollection(
    collectionName: string,
    fileName: string
  ): Promise<any> {
    const res = await axiosInstance.delete(
      `/bot-vector-store/${encodeURIComponent(collectionName)}/files/${encodeURIComponent(fileName)}`
    );
    return res.data;
  }

  public static async uploadFileToCollection(file: File, collectionName: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('collectionName', collectionName);

    const res = await axiosInstance.post('/bot-vector-store/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  }
}
