<template>
  <div class="mainContainer">
    <div class="main">
      <div class="pictures">
        <div class="left">
          <div class="imgBox">
            <img
              class="imageSize"
              @click="
                enterImage(
                  'https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg'
                )
              "
              src="https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
            />
          </div>
        </div>
        <div class="middle">
          <div class="imgBox">
            <img
              class="imageSize"
              @click="
                enterImage(
                  'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2021%2F08%2FScreen-Shot-2021-08-16-at-4.05.17-PM.jpg'
                )
              "
              src="https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2021%2F08%2FScreen-Shot-2021-08-16-at-4.05.17-PM.jpg"
            />
          </div>
        </div>
        <div class="right">
          <div class="imgBox">
            <img
              id="myinput"
              @click="
                enterImage(
                  'https://image.freepik.com/free-photo/close-up-happy-surprised-man-looking-left-with-excitement_1258-26769.jpg'
                )
              "
              class="imageSize"
              src="https://image.freepik.com/free-photo/close-up-happy-surprised-man-looking-left-with-excitement_1258-26769.jpg"
            />
          </div>
        </div>
      </div>
      <!-- input image box -->
      <div class="imgInput">
        <div class="labelImage">
          <label for="data">Select your Image</label>
        </div>
        <div class="inputField">
          <input id="data" @change="saveItem" type="file" />
        </div>
      </div>

      <!-- display result -->
      <div class="displayResult">
        <div class="resultImg" v-if="image !== ''">
          <div class="imgBox flex-row border1">
            <canvas id="canvas" class="canvas"></canvas>
            <img
              v-if="image !== ''"
              :src="image"
              id="imgg"
              crossorigin="anonymous"
              width="auto"
              height="auto"
            />
          </div>
        </div>
        <div class="loader" v-if="loader">
          <span class="spinner-border"></span>
          <br />
          <h3>Predicting your Photo</h3>
          <div>
            <button
              class="btn btn-secondary p-2 mt-3"
              @click="cancelpred"
            >
              Cancel
            </button>
          </div>
        </div>
        <div class="resultTable" v-if="!loader">
          <div class="inline-row" v-if="pred.length > 0 && image !== ''">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-5">
                <div class="row">
                  <div class="bg-dark text-white col-12 text-center">
                    Predictions Data
                  </div>
                </div>
                <div class="row" v-for="val in pred" :key="val">
                  <div class="col-12 border text-center">
                    TopLeft: {{ val.topLeft }}
                  </div>
                  <div class="col-12 border text-center">
                    BottomRight:{{ val.bottomRight }}
                  </div>
                  <div class="col-12 border text-center">
                    Left Eye:{{ val.landmarks[1] }}
                  </div>
                  <div class="col-12 border text-center">
                    Right Eye:{{ val.landmarks[0] }}
                  </div>
                  <div class="col-12 border text-center">
                    Nose:{{ val.landmarks[2] }}
                  </div>
                  <div class="col-12 border text-center">
                    Mouth:{{ val.landmarks[3] }}
                  </div>
                  <div class="col-12 border text-center">
                    Left Ear:{{ val.landmarks[4] }}
                  </div>
                  <div class="col-12 border text-center">
                    Right Ear:{{ val.landmarks[5] }}
                  </div>
                  <div class="col-12 border text-center">
                    Rotate Angle:{{ rotateangle ? rotateangle : "" }}
                  </div>
                  <div>
                    <button
                      class="
                        btn btn-secondary
                        p-2
                        mt-3
                        col-12
                        border
                        text-center
                      "
                      @click="cancelpred"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-1"></div>
              <div class="col-5">
                <div class="row">
                  <div v-if="secondLoader" class="col-12 loader">
                    <span class="spinner-border"> </span>
                  </div>
                  <div
                    v-if="!secondLoader"
                    id="heading"
                    class="col-9 bg-dark text-white"
                  >
                    Please click on goggle to place on image
                  </div>
                  <div>
                    <sidebar
                      @value="handleImg"
                      :imageval="rowvalue"
                      id="sidebar"
                      class="col-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "./sidebar.vue";

export default {
  components: { sidebar },
  data() {
    return {
      rowvalue: { height: 300 },
      data: [],
      image: "",
      url: "",
      border: true,
      loader: false,
      secondLoader: false,
      pred: "",
      rotateangle: "",
    };
  },
  methods: {
    async PredictData() {
      const blazeface = require("@tensorflow-models/blazeface");
      const model = await blazeface.load();
      const img = document.getElementById("imgg");
      const predictions = await model.estimateFaces(img, false);
      if (predictions.length > 0) {
        this.pred = [...predictions];
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(250,225,6,0.5)";

        for (let i = 0; i < predictions.length; i++) {
          // this.newRotate(predictions[i])

          // if(this.rotateangle < -1000 ){
          //   this.exception()
          //   //  this.PredictData()
          //    break;
          // }else if(this.rotateangle > 1000){
          //   this.exception()
          //   //  this.PredictData()
          //    break;
          // }

          const start = predictions[i].landmarks[1];
          const end = predictions[i].landmarks[0];
          ctx.fillStyle = "green"; // Left eye

          ctx.fillRect(start[0], start[1], 10, 10);
          ctx.fillStyle = "red"; // Right eye

          ctx.fillRect(end[0], end[1], 10, 10);
        }
      }
      this.loader = false;
    },

    cancelpred() {
      this.loader = false;
      this.image = "";
      this.pred = "";
      document.getElementById("data").value = "";
    },
    enterImage(src) {
      if (this.image != "") {
        const img = document.getElementById("imgg");
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      (this.data = []), (this.image = ""), (this.loader = true);
      this.image = src;
      this.pred = "";
      this.PredictData();
    },
    saveItem(e) {
      if (this.image != "") {
        const img = document.getElementById("imgg");
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      (this.data = []), (this.image = ""), (this.loader = true);
      const files = e.target.files[0];
      this.image = URL.createObjectURL(files);
      this.pred = "";
      this.PredictData();
      console.log(this.url, "ffffffffffile");
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
    handleImg(val) {
      this.secondLoader = true;
      // this.loader = "on";
      // document.getElementById("status" + this.index).innerText = "...";
      this.findFaces(val);
    },
    async findFaces(value) {
      const blazeface = require("@tensorflow-models/blazeface");
      const model = await blazeface.load();
      const img = document.getElementById("imgg");
      const predictions = await model.estimateFaces(img, false);

      if (predictions.length > 0) {
        console.log(predictions);
        this.pred = [...predictions];

        // document.getElementById("status" + this.index).innerText =
        //   "Face(s) found goggle placed!";
        const canvas = document.getElementById("canvas");
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
        this.secondLoader = false;
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}
.mainContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main {
  position: relative;
  width: 96%;
  margin: 20px auto 20px;
  /* max-width: 100%; */
  border: none;
  display: block;
}
.pictures {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 200px;
  min-width: 200px;
  max-height: 550px;
  display: flex;
}
.left {
  position: relative;
  display: flex;
  flex: 30%;
  justify-content: center;
  align-items: center;
  border: 8px solid black;
}
#imgg {
  max-height: 650px !important;
  max-width: 550px !important;
}
.left .imgBox {
  margin: 10px;
}
.imageSize {
  width: 300px;
  height: 200px;
}

.middle {
  position: relative;
  display: flex;
  flex: 30%;
  margin: 0 20px 0;
  justify-content: center;
  align-items: center;
  border: 8px solid black;
}
.middle .imgBox {
  margin: 10px;
}
.right {
  position: relative;
  display: flex;
  flex: 30%;
  justify-content: center;
  align-items: center;
  border: 8px solid black;
}
.right .imgBox {
  margin: 10px;
}

.main_head {
  font-size: 55px;
}

.imgInput {
  position: relative;
  display: flex;
  margin-top: 50px;
  width: 100%;
  height: 100px;
}
.labelImage {
  width: 45%;
  text-align: end;
}
.labelImage label {
  font-size: 15px;
  font-weight: 600;
}
.inputField {
  margin-left: 30px;
}
.inputField input {
  font-size: 15px;
}
.displayResult {
  position: relative;
  display: flex;
  width: 100%;
}
.loader {
  width: 100%;
  text-align: center;
}

#sidebar {
  display: flex;
  height: 50vh;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  width: 75%;
  overflow: hidden;
  background: skyblue;
  flex-direction: column;
}
.border1 {
  border: 10px solid black;
}
.imgBox {
  margin: auto;
}
.resultTable {
  position: relative;
  margin-left: 10px;
  width: 70%;
}

.br {
  outline: none;
}
label {
  font-size: 20px;
}
.details {
  height: 300px;
}
.setDim {
  width: 300px;
  height: 200px;
}
/* Testing */
.canvas {
  position: absolute;
  z-index: 99;
}
.canvastry {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
/* end */
@media only screen and (max-width: 600px) {
  .mainContainer {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main {
    margin: 0px;
    padding: 0;
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
  }
  .pictures {
    margin: auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    /* flex-direction: column; */
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
  }
  .left {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .middle {
    margin: 20px 0 20px;
    width: 100%;
  }
  .right {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .displayResult {
    margin: 0;
    padding: 0;
    width: 100%;
    display: block;
  }
  .inputField {
    margin: 0;
  }
  .resultImg {
    width: 100%;
  }
  .resultTable {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
