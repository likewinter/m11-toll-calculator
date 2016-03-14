<style scoped>
    .list {
      margin-top: 40px;
    }
    .expand-transition {
      transition: all .5s ease-in-out;
      max-height: 500px;
      overflow: hidden;
    }
    .expand-enter, .expand-leave {
      max-height: 0;
      opacity: 0;
    }
</style>

<template>
  <div class="row list">
    <trip
      v-for="trip in tripList"
      :trip="trip"
      :list-name="listName"
      :index="$index"
      transition="expand">
    </trip>
  </div>
  <div class="row">
    <div class="col-xs-4 col-sm-4 col-md-2 col-lg-2 col-xs-offset-4 col-sm-offset-3 col-md-offset-4 col-lg-offset-4 text-center">
      <button class="btn btn-block btn-success" @click="addDefaultTrip(listName)">Добавить</button>
    </div>
  </div>
</template>

<script>
  import Trip from './trip';
  import store from '../store';
  import { addDefaultTrip } from '../store/actions';

  export default {
    props: ['listName'],
    components: { Trip },
    computed: {
      tripList() {
        return this.allTripLists[this.listName];
      },
    },
    store,
    vuex: {
      getters: {
        allTripLists: state => state.tripLists,
      },
      actions: {
        addDefaultTrip,
      },
    },
    created() {
      this.addDefaultTrip(this.listName);
    },
  };
</script>