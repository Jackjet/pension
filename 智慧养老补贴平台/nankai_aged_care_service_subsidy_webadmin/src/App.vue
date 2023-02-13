<template>
  <div id="app">
    <Header></Header>
    <Nav></Nav>
    <router-view style="flex:1" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Nav from "@/components/navList";
import Footer from "@/components/footer";
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Nav
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
}
</style>
