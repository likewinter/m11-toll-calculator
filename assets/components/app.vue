<style>
    .collapse { transition: height .3s ease-out; } 
    .popover .close { position: absolute; top: 7px; right: 10px; }
    footer {
        color: #CCC;
        margin-top: 10px;
        font-size: .9em;
    }
</style>

<template>
    <div class="container">
        <div class="row">
            <nav class="navbar navbar-default" role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Меню</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" v-link="{path: '/'}">M11 <span class="glyphicon glyphicon-road"></span> Калькулятор</a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <li v-link="{name: 'multiple'}"><a v-link="{name: 'multiple'}">Несколько маршрутов</a></li>
                        <li v-link="{name: 'single'}"><a v-link="{name: 'single'}">Постоянный маршрут</a></li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </nav>
        </div>
        <router-view keep-alive></router-view>
        <footer class="text-right">
            &copy; 2016 <a href="mailto:anton@pinked.ru">Anton Orlov</a>
        </footer>
    </div>
</template>

<script>
  import { collapse } from 'bootstrap.native';
  import store from '../store';
  import { getInitialData } from '../store/actions';
  
  export default {
    store,
    vuex: {
      actions: {
        getInitialData,
      },
    },
    created() {
      this.getInitialData();
    },
    ready() {
      new collapse('[data-toggle="collapse"]', { duration: 300 });
    },
  };
</script>