<template>

  <div>
    <router-link to="/">Some</router-link>
    <router-link to="/else">Else</router-link>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>

</style>
