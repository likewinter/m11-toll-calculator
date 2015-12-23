<template>
    <trip-list :list-name="listName" keep-alive></trip-list>
    <costs :list-name="listName"></costs>
</template>

<script>
  import TripList from './trip_list';
  import Costs from './costs';
  import store from '../store';

  const listName = 'multiple';

  export default {
    data() {
      return {listName};
    },
    created() {
      store.actions.addTripList(listName);
    },
    components: {TripList, Costs},
  };
</script>