<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from './components/footer'
export default {
  name: 'app',
  components: {
    myfooter: myfooter,
  }
}
</script>

<style>

</style>
