// import { useEffect, useRef } from 'react';
// import _ from 'lodash';

// const useThrottle = (callback, delay) => {
//   const throttledCallback = useRef(_.throttle(callback, delay));

//   useEffect(() => {
//     const currentThrottledCallback = throttledCallback.current;

//     // Cleanup the throttled function on component unmount
//     return () => {
//       currentThrottledCallback.cancel();
//     };
//   }, []);

//   return throttledCallback.current;
// };

// export { useThrottle };
