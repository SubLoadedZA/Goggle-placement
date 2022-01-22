<template>
  <div
    class="flex-container"
    :style="{ height: imageval.height > 300 ? imageval.height + 'px' : '70vh' }"
  >
    <!-- <ul v-for="(val, index) in image" :key="index">
      <li @click="handleImage(val)"><img :src="val.img" class="imgsize" /></li>
    </ul> -->

    <div class="inline-row">
      <div
        class="inline-col"
        v-for="(val, index) in image"
        :key="index"
        @click="handleImage(val)"
      >
        <img :src="val.img" class="imgsize" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageval", "pred"],
  data() {
    return {
      image: [
        {
          name: "spec1",
          img: "https://pngimg.com/uploads/sunglasses/sunglasses_PNG155.png",
        },
        {
          name: "spec2",
          img: "https://pngimg.com/uploads/glasses/glasses_PNG54356.png",
        },
        {
          name: "spec3",
          img: "https://static.vecteezy.com/system/resources/previews/001/196/730/non_2x/sunglasses-png.png",
        },
        {
          name: "spec4",
          img: "https://thypix.com/wp-content/uploads/2021/02/pixel-sunglasses-19-700x296.png",
        },
      ],
    };
  },
  methods: {
    handleImage(val) {
      this.$emit("value", val);
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  /* height: 50vh; */
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  background: skyblue;
  flex-direction: column;
}

.inline-row {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  align-items: center;
  flex-wrap: wrap;
}
.inline-col {
  width: 100%;
  margin: 20px 0px;
  align-items: center;
}
ul {
  list-style-type: none;
}
li {
  flex-basis: 50%;
}
.imgsize {
  width: 150px;
  margin-left: 15%;
}
</style>
