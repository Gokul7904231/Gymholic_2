export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateGymData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Gym name is required');
  }

  if (!data.location || !data.location.address) {
    errors.push('Gym address is required');
  }

  if (!data.pricePerSlot || data.pricePerSlot <= 0) {
    errors.push('Valid price per slot is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateSlotData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.date) {
    errors.push('Slot date is required');
  }

  if (!data.startTime) {
    errors.push('Start time is required');
  }

  if (!data.endTime) {
    errors.push('End time is required');
  }

  if (!data.capacity || data.capacity <= 0) {
    errors.push('Valid capacity is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
