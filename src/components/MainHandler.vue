<template>
  <div class="grid-container">
    <div v-for="(val, index) in images" :key="val">
      <testing :srcdata="val" :index="index" />
    </div>
  </div>
</template>

<script>
import Testing from "./testing.vue";
export default {
  components: { Testing },
  data() {
    return {
      images: [
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c4d25b26-768e-4aca-9839-8d84f00d6500/dd085vl-eb19e188-16d2-469c-a656-e33f43e4ae9c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0ZDI1YjI2LTc2OGUtNGFjYS05ODM5LThkODRmMDBkNjUwMFwvZGQwODV2bC1lYjE5ZTE4OC0xNmQyLTQ2OWMtYTY1Ni1lMzNmNDNlNGFlOWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4GW82XDhkpOTW59Qfe98lMISfaRZHi_gTC9eJobItVM",
        "https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
        "https://image.shutterstock.com/image-photo/close-portrait-smiling-handsome-man-260nw-1011569245.jpg",
        "https://thumbs.dreamstime.com/z/headshot-attractive-man-chiseled-jaw-9913474.jpg",
        "https://hips.hearstapps.com/digitalspyuk.cdnds.net/14/11/movies-captain-america-the-winter-soldier-chris-evans.jpg",
        "/images/person2.jpg",
        "https://thumbs.dreamstime.com/z/head-portrait-handsome-man-staring-close-up-91669990.jpg",
        "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/10/21/Pictures/_7e701072-1375-11eb-9315-b00ef9141a48.jpg",
        "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2021%2F08%2FScreen-Shot-2021-08-16-at-4.05.17-PM.jpg",
        "https://media.istockphoto.com/photos/angry-and-displeased-caucasian-bearded-blond-young-man-feeling-or-picture-id1217034200",
        "https://image.freepik.com/free-photo/close-up-happy-surprised-man-looking-left-with-excitement_1258-26769.jpg",
        
      ],
    };
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;

  grid-template-columns: repeat(2, 1fr);
}
.gridrow {
  grid-row: 1;
}
</style>