'use client';

import { cn } from '@/libs/utils';
import { motion } from 'framer-motion';

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn('flex space-x-1 items-center', className)}>
      {[0, 1, 2].map(dot => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-current rounded-full"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
