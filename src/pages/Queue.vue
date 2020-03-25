<template>
  <div>
    <div v-for="queue in queues" :key="queue._id">
      <blog-detail-faculty
        :form="queue.faculty"
        :status="queue.status"
        :fac_time="queue.fac_time"
        :time="queue.time"
      />
    </div>
    <button-add @clickadd="clickadd" />
    <dialog-queue :dialog="dialog" :facultys="facultys" @dialogqueue="addqueue" />
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
    },
    addqueue(status, faculty) {
      this.dialog = false;
      if (status == 0 && faculty != null) {
        this.$store.dispatch("time/addqueue", {
          id: this.$route.params.id,
          faculty: faculty
        });
      }
    }
  },
  created() {
    this.$store.dispatch("time/getallqueue", this.$route.params.id);
    this.$store.dispatch("time/getforselect");
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