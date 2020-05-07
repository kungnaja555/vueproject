<template>
  <div>
    <v-card class="mx-auto" width="70%">
      <v-stepper v-model="state">
        <v-stepper-header>
          <v-stepper-step :complete="state > 0" step="1">Name of step 1</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="state > 1" step="2">Name of step 2</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="state > 3" step="3">Name of step 3</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="0">
            <v-card class="mb-12" color="grey lighten-1" height="470px"></v-card>

            <v-btn color="primary" @click="setState(1)">เริ่ม</v-btn>
          </v-stepper-content>

          <v-stepper-content step="1">
            <div>
              <img :src="path" width="100%" id="img" @click="createSquare" @mousemove="mouseMove" />
              <div :style="element"></div>
            </div>

            <v-btn color="primary" @click="setState(2)">กำหนดจุด</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="grey lighten-1" height="470px"></v-card>

            <v-btn color="primary" @click="setState(3)">เล่น</v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <img :src="img" width="100%" />
            <div>เวลาเฉลี่ย 10 คนได้ {{avg}} วินาที</div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "../config/api";
export default {
  data() {
    return {
      mouse: {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
      },
      status: false,
      rectangle: false,
      element: {
        width: "",
        height: "",
        top: "",
        left: "",
        border: "",
        position: ""
      },
      position: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      },
      path: api.port + "image/background.jpg",
      count: 0,
      intervalStatus: ""
    };
  },
  methods: {
    createSquare(e) {
      var img = document.getElementById("img");
      var ev = e || window.event;
      if (this.status) {
        this.status = false;
        img.style.cursor = "default";
        this.setPosition();
      } else {
        this.resetElement();
        this.status = true;
        this.mouse.startX = ev.offsetX + 24;
        this.mouse.startY = ev.offsetY + 24;
        this.element.border = "2px solid #ff0000";
        this.element.position = "absolute";
        img.style.cursor = "crosshair";
      }
    },
    mouseMove(e) {
      var ev = e || window.event;
      if (this.status) {
        this.mouse.x = ev.offsetX;
        this.mouse.y = ev.offsetY;
        this.element.width = Math.abs(this.mouse.x - this.mouse.startX) + "px";
        this.element.height = Math.abs(this.mouse.y - this.mouse.startY) + "px";
        this.element.left =
          this.mouse.x - this.mouse.startX < 0
            ? this.mouse.x + "px"
            : this.mouse.startX + "px";
        this.element.top =
          this.mouse.y - this.mouse.startY < 0
            ? this.mouse.y + "px"
            : this.mouse.startY + "px";
      }
    },
    resetElement() {
      this.element.width = 0;
      this.element.height = 0;
      this.element.top = 0;
      this.element.left = 0;
      this.element.border = "";
    },
    setPosition() {
      var img = document.getElementById("img");
      this.position.x =
        parseFloat(this.mouse.startX) * (img.naturalWidth / img.width);
      this.position.y =
        parseFloat(this.mouse.startY) * (img.naturalWidth / img.width);
      this.position.w =
        parseFloat(this.mouse.x) * (img.naturalWidth / img.width);
      this.position.h =
        parseFloat(this.mouse.y) * (img.naturalWidth / img.width);
      this.rectangle = true;
    },
    setState(state) {
      var payout = {
        state: state,
        position: this.position
      };
      if (state == 0) {
        this.path = api.port + "image/background.jpg";
        this.$store.dispatch("redis/setState", payout);
      } else if (state == 2) {
        if (this.rectangle == true) {
          this.$store.dispatch("redis/setState", payout);
        }
      } else if (state == 3) {
        setTimeout(() => {
          this.$store.dispatch("redis/setState", payout);
        }, 3000);
      } else {
        setTimeout(() => {
          this.$store.dispatch("redis/setState", payout);
        }, 1000);
      }
    }
  },
  created() {
    clearInterval(this.intervalStatus);
    this.$store.dispatch("redis/getState");
    this.intervalStatus = setInterval(() => {
      this.$store.dispatch("redis/getCount");
    }, 100);
    this.$store.dispatch("redis/getAvg");
  },
  computed: {
    ...mapState("redis", {
      state: "state",
      img: "img",
      avg: "avg"
    })
  }
};
</script>


<style>
</style>