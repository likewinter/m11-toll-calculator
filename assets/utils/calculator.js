export const costs = (tripList, rates) => {
    return tripList.reduce((costs, trip) => {
        const quantity = trip.quantity || 1;
        const [{tarif: directionRates}] = _.where(rates, {...trip.direction});
        const [{tarif: hourRates}] = directionRates.filter(rate => {
            const [fromHours, tillHours] = [rate.from.split(':')[0], rate.till.split(':')[0]];

            return (trip.time.hours >= fromHours) && (trip.time.hours < tillHours);
        });
        const [{prices: applicableRate}] = hourRates.filter(rate => {
            if (rate.days.length === 1) return trip.time.day == rate.days[0];

            return (trip.time.day >= rate.days[0]) && (trip.time.day <= rate.days[1]);
        });
        costs.total += applicableRate[0] * quantity;
        costs.transponderTotal += applicableRate[1] * quantity;

        return costs;
    }, {total: 0, transponderTotal: 0});
};
