<template>
    <div class="row">
        <h2><span class="glyphicon glyphicon-road"></span> {{total}}&#8381;</h2>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default {
        computed: {
            total() {
                return this.tripList.reduce((acc, trip) => {
                    const [{tarif: directionRates}] = _.where(this.rates, {...trip.direction});
                    const [{tarif: hourRates}] = directionRates.filter(rate => {
                        const [fromHours, tillHours] = [rate.from.split(':')[0], rate.till.split(':')[0]];

                        return (trip.time.hours >= fromHours) && (trip.time.hours < tillHours);
                    });
                    const [{prices: applicableRate}] = hourRates.filter(rate => {
                        if (rate.days.length === 1) return trip.time.day == rate.days[0];

                        return (trip.time.day >= rate.days[0]) && (trip.time.day <= rate.days[1]);
                    });
                    acc += applicableRate[0];

                    return acc;
                }, 0);
            }
        },
        props: ['rates', 'tripList']
    }
</script>