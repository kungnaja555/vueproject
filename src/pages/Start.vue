<template>
  <div>
    <div style="font-size:25px;">จับเวลา</div>
    <v-card class="mx-auto" width="70%" v-if="state==0">
      <v-container>
        <v-card class="mb-4" color="grey lighten-1" height="700px"></v-card>

        <v-btn color="primary" @click="setState(1)">เริ่ม</v-btn>
      </v-container>
    </v-card>
    <v-card class="mx-auto" width="70%" v-if="state==1">
      <v-container>
        <img
          v-show="true"
          :src="url"
          width="100%"
          id="img"
          @click="createSquare"
          @mousemove="mouseMove"
        />
        <div :style="element"></div>
        <v-btn color="primary" @click="setState(2)">กำหนดกรอบ</v-btn>
      </v-container>
    </v-card>
    <v-card class="mx-auto" width="70%" v-if="state==2">
      <v-container>
        <v-card class="mb-4" color="grey lighten-1" height="700px"></v-card>
        <v-btn color="primary" @click="setState(3)">เล่น</v-btn>
      </v-container>
    </v-card>
    <v-card class="mx-auto" width="70%" v-if="state==3">
      <v-container>
        <img :src="img" width="100%" />
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
        this.mouse.startX = ev.offsetX;
        this.mouse.startY = ev.offsetY;
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
    async setState(state) {
      var payout = {
        state: state,
        position: this.position
      };
      if (state == 1) {
        this.$store.dispatch("redis/setState", payout);
        setTimeout(() => {
          this.$store.dispatch("redis/setUrl");
        }, 3000);
      } else if (state == 2) {
        if (this.rectangle == true) {
          this.$store.dispatch("redis/setState", payout);
        }
      } else {
        setTimeout(() => {
          this.$store.dispatch("redis/setState", payout);
        }, 3000);
      }
    }
  },
  created() {
    clearInterval(this.intervalStatus);
    this.$store.dispatch("redis/getState");
    this.$store.dispatch("redis/getUrl");
    this.intervalStatus = setInterval(() => {
      this.$store.dispatch("redis/getCount");
    }, 100);
  },
  computed: {
    ...mapState("redis", {
      state: "state",
      img: "img",
      url: "url"
    })
  }
};
</script>


<style>
</style>