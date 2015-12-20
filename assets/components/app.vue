<template>
    <div class="row">
        <h1>Toll road costs calculator</h1>
    </div>
    <trip-calculator :trip-list="tripList" :rates="rates"></trip-calculator>
    <trip-list :directions="directions" :trip-list="tripList"
        v-on:new="newTrip"
        v-on:update-list="updateTrip"></trip-list>
</template>

<script>
    import TripList from './trip_list';
    import TripCalculator from './trip_calculator';
    import _ from 'lodash';

    export default {
        data() {
            return {
                rates: [],
                directions: [],
                tripList: []
            }
        },
        ready() {
            this.$http.get('/json/tarifs.json', (data) => {
                this.rates = data;
                this.directions = _(data).pluck('from', 'to').uniq().value();
            });
        },
        methods: {
            newTrip(trip) {
                this.tripList.push(trip);
            },
            updateTrip(id, trip) {
                this.tripList.$set(id, {...this.tripList[id], ...trip});
            }
        },
        events: {
            'trip-remove'(tripId) {
                this.tripList.splice(tripId, 1);
            }
        },
        components: {TripList, TripCalculator}
    }
</script>