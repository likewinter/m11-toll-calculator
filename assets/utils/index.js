export const getNextTime = () => {
  const currentTime = new Date();
  const roundedHours = Math.round(currentTime.getHours() + currentTime.getMinutes() / 60);
  let hours = roundedHours;
  let day = currentTime.getDay() === 0 ? 7 : currentTime.getDay() + 1;

  if (roundedHours === 24) {
    hours = 0;
    day = (day === 7) ? 1 : day;
  }

  return { hours, day };
};

export const getDefaultTrip = () => {
  const trip = {
    direction: {
      from: 'Москва',
      to: 'Шереметьево',
    },
    time: getNextTime(),
  };

  return trip;
};

export const zeroPad = num => (num < 10 ? '0' : '') + num;

export const zeroPadHours = hours => `${zeroPad(hours)}:00`;
