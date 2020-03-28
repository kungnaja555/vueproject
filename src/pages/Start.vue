<template>
  <div>
    <v-card class="mx-auto" width="70%">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Name of step 3</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12" color="grey lighten-1" height="470px"></v-card>

            <v-btn color="primary" @click="setState(1)">เริ่ม</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <img
              :src="'http://localhost:8000/image/'+img"
              width="100%"
              id="img"
              @click="createSquare"
              @mousemove="mouseMove"
            />
            <div :style="element"></div>

            <v-btn color="primary" @click="setState(2)">กำหนดจุด</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <img
              :src="'http://localhost:8000/image/'+img"
              width="100%"
              id="img"
              @click="createSquare"
              @mousemove="mouseMove"
            />
            <div :style="element"></div>

            <v-btn color="primary" v-if="state==2 || state==4" @click="setState(3)">เล่น</v-btn>
            <v-btn color="primary" v-if="state==3" @click="setState(4)">หยุด</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      e1: 1,
      mouse: {
        x: "",
        y: "",
        startX: "",
        startY: ""
      },
      status: false,
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
      }
    };
  },
  methods: {
    createSquare(e) {
      if (this.status) {
        this.status = false;
        this.setPosition();
      } else {
        this.resetElement();
        this.status = true;
        this.mouse.startX = e.offsetX;
        this.mouse.startY = e.offsetY;
        this.element.border = "1px solid #ff0000";
        this.element.position = "absolute";
      }
    },
    mouseMove(e) {
      if (this.status) {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
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
        parseFloat(this.element.width) * (img.naturalWidth / img.width);
      this.position.y =
        parseFloat(this.element.height) * (img.naturalWidth / img.width);
      this.position.w =
        parseFloat(this.element.left) * (img.naturalWidth / img.width);
      this.position.h =
        parseFloat(this.element.top) * (img.naturalWidth / img.width);
    },
    setState(state) {
      var payout = {
        state: state,
        position: this.position
      };
      this.$store.dispatch("redis/setstate", payout);
      if (state == 1) {
        this.e1 = 2
        this.$store.dispatch("redis/getimage");
      }
      if (state == 2) {
        this.e1 = 3
        this.$store.dispatch("redis/getimage");
      }
    }
  },
  created() {
    this.$store.dispatch("redis/getstate");
  },
  computed: {
    ...mapState("redis", {
      state: "state",
      img: "img"
    })
  }
};
</script>


<style>
</style>