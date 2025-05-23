export interface VectorStoreCollectionsResponse {
  status: string;
  collection: Array<string>;
}

export interface CollectionFile {
  source: string;
  firstAdded: string;
  lastUpdated: string;
}

export interface VectorCollection {
  id: string;
  name: string;
  files: CollectionFile[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionsWithFilesResponse {
  status: 'success';
  data: VectorCollection[];
  total: number;
  page: number;
  limit: number;
}
