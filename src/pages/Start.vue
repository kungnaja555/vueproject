<template>
  <div @click="createSquare" @mousemove="mousemove">
    <img class src="../assets/image/img.jpg" width="70%" id="img" />
    <div :style="element"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      },
      img: ""
    };
  },
  created() {},
  computed: {},
  methods: {
    // logv(event) {
    //   this.x = event.offsetX;
    //   this.y = event.offsetY;
    // },
    createSquare(event) {
      if (this.status) {
        this.status = false;
        this.setposition();
      } else {
        this.resetelement();
        this.status = true;
        this.mouse.startX = event.offsetX;
        this.mouse.startY = event.offsetY;
        this.element.border = "1px solid #ff0000";
        this.element.position = "absolute";
      }
    },
    mousemove(event) {
      if (this.status) {
        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;
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
    resetelement() {
      this.element.width = 0;
      this.element.height = 0;
      this.element.top = 0;
      this.element.left = 0;
      this.element.border = "";
    },
    setposition() {
      var img = document.getElementById("img");    
      console.log("x " + parseFloat(this.element.width) * (img.naturalWidth / img.width));
      console.log("y " + parseFloat(this.element.height) * (img.naturalWidth / img.width));
      console.log("w " + parseFloat(this.element.left) * (img.naturalWidth / img.width));
      console.log("h " + parseFloat(this.element.top) * (img.naturalWidth / img.width));
    }
  }
};
</script>


<style>
.rectangle {
  border: 1px solid #ff0000;
  position: absolute;
}
</style>