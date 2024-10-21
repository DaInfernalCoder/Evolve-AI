import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StreakButtonProps {
  streak: number;
}

const StreakButton: React.FC<StreakButtonProps> = ({ streak }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [streak]);

  return (
    <motion.div
      className="relative inline-flex items-center justify-center p-2 bg-orange-500 rounded-full cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-white font-bold">{streak}</span>
      {isAnimating && (
        <motion.div
          className="absolute inset-0 bg-orange-400 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
      <motion.div
        className="absolute bottom-0 left-1/2 w-4 h-6 bg-orange-500"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0], scaleY: [1, 0.8, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ transformOrigin: "bottom", translateX: "-50%" }}
      />
    </motion.div>
  );
};

export default StreakButton;
