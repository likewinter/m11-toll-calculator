import { filter } from 'lodash';

export const calculateCosts = (tripList, rates) => {
  const defaultCosts = { total: 0, transponderTotal: 0 };

  if (!rates.length) return defaultCosts;

  return tripList.reduce((costs, trip) => {
    const newCosts = costs;
    const quantity = trip.quantity || 1;
    const [{ tarif: directionRates }] = filter(rates, { ...trip.direction });
    const [{ tarif: hourRates }] = directionRates.filter(rate => {
      const [fromHours, tillHours] = [rate.from.split(':')[0], rate.till.split(':')[0]];

      return (trip.time.hours >= fromHours) && (trip.time.hours < tillHours);
    });
    const [{ prices: applicableRate }] = hourRates.filter(rate => {
      if (rate.days.length === 1) return trip.time.day === rate.days[0];

      return (trip.time.day >= rate.days[0]) && (trip.time.day <= rate.days[1]);
    });
    newCosts.total += applicableRate[0] * quantity;
    newCosts.transponderTotal += applicableRate[1] * quantity;

    return newCosts;
  }, defaultCosts);
};
