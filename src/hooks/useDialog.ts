import { useState } from 'react';

const useDialog = () => {
  const [isVisible, setIsVisible] = useState(false);

  return {
    isVisible,
    open: () => setIsVisible(true),
    close: () => setIsVisible(false),
  };
};

export default useDialog;
