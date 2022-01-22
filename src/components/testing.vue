<template>
  <div>
    <div id="face-finder" class="myflex">
      <div class="flex-row">
        <canvas :id="'canvas' + index" class="canvas"></canvas>
        <canvas :id="'canvastry' + index" class="canvastry"></canvas>
        <img :src="imgurl" crossorigin="anonymous" :id="'img' + index" />
      </div>

      <div>
        <p
          :id="'status' + index"
          :class="
            loader == 'on' ? 'spinner-border text-success sr-only' : 'status'
          "
        >
          Please Click on the goggle to place on image
        </p>

        <sidebar @value="handleImg" :imageval="rowvalue" />
      </div>
    </div>
    <div class="inline-row" v-if="pred.length > 0">
      <div>
        <h2 :style="{ color: 'white', textAlign: 'center' }">
          Predictions Data
        </h2>
        <ul v-for="val in pred" :key="val">
          <li>TopLeft: {{ val.topLeft }}</li>
          <li>BottomRight:{{ val.bottomRight }}</li>
          <li>Left Eye:{{ val.landmarks[1] }}</li>
          <li>Right Eye:{{ val.landmarks[0] }}</li>

          <li>Nose:{{ val.landmarks[2] }}</li>
          <li>Mouth:{{ val.landmarks[3] }}</li>

          <li>Left Ear:{{ val.landmarks[4] }}</li>
          <li>Right Ear:{{ val.landmarks[5] }}</li>
          <li>Rotate Angle:{{ rotateangle ? rotateangle : "" }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "./sidebar.vue";
export default {
  components: { sidebar },
  props: ["srcdata", "index"],
  data() {
    return {
      rowvalue: { height: 300 },
      goggle: "https://pngimg.com/uploads/sunglasses/sunglasses_PNG155.png",
      imgurl: "",
      pred: "",
      loader: "off",
      rotateangle: "",
    };
  },
  created() {
    this.imgurl = this.srcdata;
  },
  mounted() {
    this.predictData();
  },

  methods: {
    async predictData() {
      const blazeface = require('@tensorflow-models/blazeface');
      const model = await blazeface.load();
      const img = document.getElementById("img" + this.index);

      const predictions = await model.estimateFaces(img, false);
      if (predictions.length > 0) {
        this.pred = [...predictions];
        const canvas = document.getElementById("canvas" + this.index);
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(250,225,6,0.5)";

        for (let i = 0; i < predictions.length; i++) {
          this.newRotate(predictions[i])

          if(this.rotateangle < -1000 ){
            this.exception()
             break;
          }else if(this.rotateangle > 1000){
            this.exception()
          }

          const start = predictions[i].landmarks[1];
          const end = predictions[i].landmarks[0];
          ctx.fillStyle = "green"; // Left eye

          ctx.fillRect(start[0], start[1], 10, 10);
          ctx.fillStyle = "red"; // Right eye

          ctx.fillRect(end[0], end[1], 10, 10);
          for (let i = 0; i < predictions.length; i++) {
          const landmarks = predictions[i].landmarks;
          ctx.fillStyle = "yellow";
          for (let j = 0; j < landmarks.length; j++) {
            const x = landmarks[j][0];
            const y = landmarks[j][1];
            ctx.fillRect(x, y, 10, 10);
          }
        }
        }
      }
    },
    newRotate(predictions) {
      let lefteye = predictions.landmarks[1];
      let righteye = predictions.landmarks[0];

      if (lefteye[1] > righteye[1]) {
        let l = lefteye[0] - righteye[0];
        let h = lefteye[1] - righteye[1];
 
        let tanval = h / l;
        this.rotateangle = (tanval * 180) / Math.PI;
        return (tanval * 180) / Math.PI;
      } else {
        let l = lefteye[0] - righteye[0];
        let h = righteye[1] - lefteye[1];

        let tanval = Math.atan(h / l);
        this.rotateangle = (-tanval * 180) / Math.PI;
        return (-tanval * 180) / Math.PI;
      }

    },

    exception() {
      let element = document.getElementById("img" + this.index);
      element.classList.add("rotate_image");
    },
    handleImg(val) {
      this.loader = "on";
      document.getElementById("status" + this.index).innerText = "...";
      this.findFaces(val);
    },

    async findFaces(value) {
      const blazeface = require('@tensorflow-models/blazeface');
      const model = await blazeface.load();
      const img = document.getElementById("img" + this.index);
      console.log("imd", img);

      const predictions = await model.estimateFaces(img, false);
      if (predictions.length > 0) {
        console.log(predictions);
        this.loader = "off";
        this.pred = [...predictions];

        document.getElementById("status" + this.index).innerText =
          "Face(s) found goggle placed!";
        const canvas = document.getElementById("canvas" + this.index);
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < predictions.length; i++) {
          var im = new Image();
          im.src = value.img;

          let lefteye = predictions[i].landmarks[1];
          let righteye = predictions[i].landmarks[0];
          let l = lefteye[0] - righteye[0];
          let h = lefteye[1] - righteye[1];
          let golength = Math.sqrt(
            Math.pow(Math.round(l), 2) + Math.pow(Math.round(h), 2)
          );
          let spechigh =
            predictions[i].landmarks[2][1] / 2 + predictions[i].landmarks[3][1];

          const end = predictions[i].bottomRight;

          let rotat = this.newRotate(predictions[i]);


          let specheight = (end[1] - spechigh) / 2;
          console;
          im.onload = function () {
            ctx.drawImage(
              im,
              (lefteye[0] + righteye[0]) / 2 - golength,
              (lefteye[1] + righteye[1]) / 2 - specheight,
              golength * 2,
              end[1] - spechigh
            );
          };
          ctx.translate(
            (lefteye[0] + righteye[0]) / 2,
            (lefteye[1] + righteye[1]) / 2
          );

          ctx.rotate((rotat * Math.PI) / 180);
          ctx.translate(
            -(lefteye[0] + righteye[0]) / 2,
            -(lefteye[1] + righteye[1]) / 2
          );
        }
      } else {
        document.getElementById("status").innerText = "No Face(s) Found";
      }
    },
  },
};
</script>

<style scoped>
.rotate_image {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
#face-finder {
  max-width: 850px;

  position: relative;
}
.myflex {
  display: flex;
  margin-top: 50px;
}
.sidediv {
  width: 20vw;
}
.hrow {
  width: 100%;
}
ul {
  display: inline-flex;
  flex-wrap: wrap;
}
.flex-row {
  width: 80vw;
  border: solid 1px red;
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.canvastry {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.inline-row {
  display: inline-flex;
  width: 45vw;
  margin: 0px;
  background: lightslategray;
  color: lightyellow;
}
img {
  max-width: 100%;
  width: 50vw;
  height: 70vh;
  display: block;
}
.status {
  width: 100%;
  background: black;
  color: white;
  text-align: center;
  margin: 0;
  padding: 1em 0;
  font-family: sans-serif;
}
</style>