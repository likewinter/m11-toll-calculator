<style lang="less" scoped>
.trip-selector {
    margin: 10px;
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
        <slot name="header"></slot>
        <div class="panel-body">
            <button type="button" class="close visible-xs-block" aria-label="Remove" @click="removeTrip"><span aria-hidden="true">&times;</span></button>
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div class="row">
                    <direction-selector :directions="directions" :direction="trip.direction" v-on:update-direction="handleDirection" v-on:swap="swapDirections(listName, index)"></direction-selector>
                </div>
                <div class="row">
                    <time-selector :show-current-time="false" :time="trip.time" v-on:update-time="handleTime"></time-selector>
                </div>
            </div>
            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 text-center hidden-xs">
                <button class="btn btn-danger remove" @click="removeTrip(listName, index)"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<script>
  import DirectionSelector from './selectors/direction';
  import TimeSelector from './selectors/time';
  import store from '../store';
  import { swapDirections, updateTrip, removeTrip } from '../store/actions';

  export default {
    props: {
      trip: {
        required: true,
        type: Object,
      },
      index: {
        required: true,
        type: Number,
      },
      listName: {},
    },
    store,
    vuex: {
      getters: {
        directions: state => state.directions,
      },
      actions: {
        swapDirections,
        updateTrip,
        removeTrip,
      },
    },
    methods: {
      handleDirection(direction) {
        this.updateTrip(this.listName, this.index, { direction });
      },
      handleTime(time) {
        this.updateTrip(this.listName, this.index, { time });
      },
    },
    components: { TimeSelector, DirectionSelector },
  };
</script>