<template>
  <div class="grid-container">
    <div>
     <Header/>
      <hr :style="{ border: '1px solid #CCCCCC', margin: '0px' }" />
    </div>
    <div class="maincontent">
     <Main/>
    </div>
    <div class="mainfooter">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Header from './Header.vue';
import Main from './Main.vue';

export default {
  components: { Header, Main, Footer },
  name: "CartoonHandler",
  data() {
    return {
      route: "",
    };
  },
 
 
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
   min-height: 100vh;
  /* grid-template-rows: repeat(1, fr); */
}


  .maincontent{

    flex:1 0 auto;
  }
  


</style>