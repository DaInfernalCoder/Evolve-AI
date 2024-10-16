import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      <div className="gradient-1"></div>
      <div className="gradient-2"></div>
      <div className="gradient-3"></div>
      <style jsx>{`
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          overflow: hidden;
        }
        .gradient-1, .gradient-2, .gradient-3 {
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 100%);
          opacity: 0.5;
          animation: rotate 20s linear infinite;
        }
        .gradient-2 {
          animation-duration: 30s;
          background: radial-gradient(circle, rgba(40,40,40,1) 0%, rgba(10,10,10,1) 100%);
        }
        .gradient-3 {
          animation-duration: 40s;
          animation-direction: reverse;
          background: radial-gradient(circle, rgba(50,50,50,1) 0%, rgba(20,20,20,1) 100%);
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
