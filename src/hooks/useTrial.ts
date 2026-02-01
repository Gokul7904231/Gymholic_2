import { useEffect, useState } from 'react';

export const useTrial = () => {
  const TRIAL_DAYS = 3;

  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const start = localStorage.getItem('trialStart');

    if (!start || start === 'expired') {
      localStorage.setItem('trialStart', Date.now().toString());
      setDaysLeft(TRIAL_DAYS);
      return;
    }

    const diff =
      TRIAL_DAYS -
      Math.floor((Date.now() - Number(start)) / (1000 * 60 * 60 * 24));

    setDaysLeft(diff);
  }, []);

  return {
    daysLeft,
    isTrialActive: daysLeft > 0,
    isExpired: daysLeft <= 0,
  };
};
