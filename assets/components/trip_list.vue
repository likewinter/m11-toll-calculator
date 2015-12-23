<style scoped>
    .expand-transition {
      transition: all .5s ease-in-out;
      max-height: 500px;
      overflow: hidden;
    }
    .expand-enter, .expand-leave {
      max-height:0;
      opacity: 0;
    }
</style>

<template>
  <div class="row">
    <trip
      v-for="trip in tripList"
      :trip="trip"
      :list-name="listName"
      :index="$index"
      track-by="$index"
      transition="expand">
    </trip>
  </div>
  <div class="row">
    <div class="col-xs-4 col-sm-4 col-md-2 col-lg-2 col-xs-offset-4 col-sm-offset-4 col-md-offset-5 col-lg-offset-5 text-center">
      <button class="btn btn-success" @click="addTrip">Добавить</button>
    </div>
  </div>
</template>

<script>
  import Trip from './trip';
  import store from '../store';

  const {addDefaultTrip} = store.actions;

  export default {
    props: ['listName'],
    components: {Trip},
    computed: {
      tripList() {
        return store.state.tripLists[this.listName];
      },
    },
    created() {
      this.addTrip();
    },
    methods: {
      addTrip() {
        addDefaultTrip(this.listName);
      },
    },
  };
</script>