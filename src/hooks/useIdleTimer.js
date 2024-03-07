import { useIdleTimer } from 'react-idle-timer';

const useIdleActivityTimer = (onIdle, onActive, time) => {
  const idleTimer = useIdleTimer({
    timeout: 1000 * 60 * time, // time in minutes
    onIdle: onIdle,
    onActive: onActive,
    debounce: 500,
    crossTab: true,
    // leaderElection: true,
    // syncTimers: 200,
  });

  return idleTimer;
}

export default useIdleActivityTimer;