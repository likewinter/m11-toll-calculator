<style lang="less" scoped>
    .trip-selector {
        margin-top: 10px;
        margin-bottom: 20px;
        position: relative;

        button.remove {
            margin-top: 1.8em;
            opacity: 0.5;

            &:hover {
                opacity: 1;
            }
        }
        button.close {
            position: absolute;
            top: 1px;
            right: 4px;
        }
    }
</style>

<template>
    <div class="trip-selector panel panel-default">
        <div class="panel-body">
            <button type="button" class="close visible-xs-block" aria-label="Remove" @click="removeTrip"><span aria-hidden="true">&times;</span></button>
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div class="row">
                    <direction-selector :directions="directions" :direction="trip.direction" v-on:update-direction="handleDirection" v-on:swap="swapDirections"></direction-selector>
                </div>
                <div class="row">
                    <time-selector :show-current-time="false" :time="trip.time" v-on:update-time="handleTime"></time-selector>
                </div>
            </div>
            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 text-center hidden-xs">
                <button class="btn btn-danger remove" @click="removeTrip"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
        </div>
    </div>
</template>

<script>
    import DirectionSelector from './selectors/direction';
    import TimeSelector from './selectors/time';
    import store from '../store';

    export default {
        props: {
            trip: {
                required: true,
                type: Object
            },
            index: {
                required: true,
                type: Number
            }
        },
        computed: {
            directions() {
                return store.state.directions;
            }
        },
        components: {TimeSelector, DirectionSelector},
        methods: {
            swapDirections() {
                store.actions.swapDirections(this.index);
            },
            handleDirection(direction) {
                store.actions.updateTrip(this.index, {direction});
            },
            handleTime(time) {
                store.actions.updateTrip(this.index, {time});
            },
            removeTrip() {
                store.actions.removeTrip(this.index);
            }
        }
    }
</script>