<template>
    <div class="trip-list">
        <trip :directions="directions" v-for="(index, trip) in tripList" :trip-id="index" :trip="trip" v-on:trip="updateTrip"></trip>
    </div>
    <div class="row">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xs-offset-10 col-sm-offset-10 col-md-offset-10 col-lg-offset-10">
            <button class="btn btn-success" @click="addTrip">Add new</button>
        </div>
    </div>
</template>

<script>
    import Trip from './trip';

    export default {
        props: ['directions', 'tripList'],
        components: {Trip},
        methods: {
            updateTrip(index, trip) {
                this.$dispatch('update-list', index, trip);
            },
            addTrip() {
                this.$dispatch('new', {
                    direction: {
                        from: 'Москва',
                        to: 'Шереметьево'
                    },
                    time: {
                        hours: 8,
                        day: 2
                    }
                });
            }
        }
    }
</script>