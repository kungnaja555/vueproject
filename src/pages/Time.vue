<template>
  <div>
    <!-- <div v-for="form in forms" :key="form.id">
      <blog-detail-faculty :form="form" />
    </div> -->
    <button-add @clickadd="clickadd" />
    <dialog-queue :dialog="dialog" />
    {{this.queues}}
    {{this.facultys}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    clickadd() {
      this.dialog = !this.dialog;
    }
  },
  created() {
    this.$store.dispatch("time/getallqueue", this.$route.params.id);
    this.$store.dispatch("time/getallfaculty");
  },
  computed: {
    ...mapGetters("time", {
      queues: "queues",
      facultys: "facultys"
    })
  }
};
</script>

<style>
</style>