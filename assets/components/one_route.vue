<template>
    <div class="row">
        <button class="btn btn-primary" @click="addTestTrips">Add</button>
    </div>
    <costs :list-name="listName"></costs>
</template>

<script>
  import Costs from './costs';
  import store from '../store';
  import { addTrip, addTripList } from '../store/actions';

  const listName = 'one_route';

  export default {
    components: { Costs },
    data() {
      return { listName };
    },
    store,
    vuex: {
      actions: {
        addTrip,
        addTripList,
      },
    },
    created() {
      this.addTripList(listName);
    },
    methods: {
      addTestTrips() {
        this.addTrip(
          this.listName,
          {
            direction: {
              from: 'Москва', to: 'Солнечногорск',
            },
            time: {
              day: 2, hours: 20,
            },
            quantity: 5,
          }
        );
      },
    },
  };
</script>