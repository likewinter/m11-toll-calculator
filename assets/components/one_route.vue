<template>
    <costs :list-name="listName"></costs>
    <div class="row">
        <p class="text-center bg-warning">В разработке</p>
    </div>
</template>

<script>
  import Costs from './costs';
  import store from '../store';

  const listName = 'one_route';

  export default {
    components: {Costs},
    data() {
      return {listName};
    },
    created() {
      store.actions.addTripList(listName);
    },
  };
</script>