import ApiError from 'api/api-error';

const findZodiacSign = (day: number, month: number) => {
  const zodiacSigns = {
    capricorn: 'capricorn',
    aquarius: 'aquarius',
    pisces: 'pisces',
    aries: 'aries',
    taurus: 'taurus',
    gemini: 'gemini',
    cancer: 'cancer',
    leo: 'leo',
    virgo: 'virgo',
    libra: 'libra',
    scorpio: 'scorpio',
    sagitarius: 'sagitarius',
  };

  if ((month === 0 && day <= 19) || (month === 11 && day >= 22)) {
    return zodiacSigns.capricorn;
  } else if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) {
    return zodiacSigns.aquarius;
  } else if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) {
    return zodiacSigns.pisces;
  } else if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) {
    return zodiacSigns.aries;
  } else if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) {
    return zodiacSigns.taurus;
  } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
    return zodiacSigns.gemini;
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) {
    return zodiacSigns.cancer;
  } else if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) {
    return zodiacSigns.leo;
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return zodiacSigns.virgo;
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return zodiacSigns.libra;
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) {
    return zodiacSigns.scorpio;
  } else if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) {
    return zodiacSigns.sagitarius;
  } else {
    throw new ApiError('Invalid combination', 400);
  }
};

export { findZodiacSign };
