<template>
    <costs :list-name="listName"></costs>
    <trip-list :list-name="listName" keep-alive></trip-list>
</template>

<script>
  import TripList from './trip_list';
  import Costs from './costs';
  import store from '../store';
  import { addTripList } from '../store/actions';

  const listName = 'multiple';

  export default {
    data() {
      return { listName };
    },
    store,
    vuex: {
      actions: {
        addTripList,
      },
    },
    created() {
      this.addTripList(listName);
    },
    components: { TripList, Costs },
  };
</script>