<style lang="less" scoped>
    .trip-selector {
        margin-top: 10px;
        margin-bottom: 20px;

        button.remove {
            margin-top: 1.8em;
            opacity: 0.5;

            &:hover {
                opacity: 1;
            }
        }
    }
</style>

<template>
    <div class="trip-selector row">
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <div class="row">
                <direction-selector :directions="directions" :direction="trip.direction" v-on:update-direction="handleDirection" v-on:swap="swapDirections"></direction-selector>
            </div>
            <div class="row">
                <time-selector :show-current-time="false" :time="trip.time" v-on:update-time="handleTime"></time-selector>
            </div>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <button class="btn btn-danger remove" @click="removeTrip">Remove</button>
        </div>
    </div>
</template>

<script>
    import DirectionSelector from './selectors/direction';
    import TimeSelector from './selectors/time';

    export default {
        props: {
            directions: {
                required: true,
                default: [],
                type: Array
            },
            tripId: {
                required: true,
                type: Number
            },
            trip: {
                required: true,
                type: Object
            }
        },
        components: {TimeSelector, DirectionSelector},
        methods: {
            swapDirections() {
                this.update({
                    direction: {
                        from: this.trip.direction.to,
                        to: this.trip.direction.from
                    }
                });
            },
            handleDirection(direction) {
                this.update({direction: {...this.trip.direction, ...direction}})
            },
            handleTime(time) {
                this.update({time: {...this.trip.time, ...time}});
            },
            update(trip) {
                this.$dispatch('trip', this.tripId, trip);
            },
            removeTrip() {
                this.$dispatch('trip-remove', this.tripId);
            }
        }
    }
</script>