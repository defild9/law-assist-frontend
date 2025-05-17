'use client';
import { createContext, useContext, useState } from 'react';

interface IModelContext {
  model?: string;
  setModel: (model?: string) => void;
}

interface IProviderProps {
  children: React.ReactNode;
}

const ModelContext = createContext<IModelContext | undefined>(undefined);

export const ModelProvider = ({ children }: IProviderProps) => {
  const [model, setModel] = useState<string | undefined>(undefined);

  return <ModelContext.Provider value={{ model, setModel }}>{children}</ModelContext.Provider>;
};

export const useModel = (): IModelContext => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};
