<template>
  <div>
    <div v-for="rehearsal in rehearsals" :key="rehearsal._id">
      <blog-rehearsal :rehearsal="rehearsal"/>
    </div>
    <button-add @clickadd="clickadd" />
    <dialog-rehearsal :form="form" :dialog="dialog" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      form: {
        years: "",
        date: new Date().toISOString().substr(0, 10),
        name: ""
      }
    };
  },
  methods: {
    clickadd() {
      this.dialog = !this.dialog;
    },
  },
  async created() {
    await this.$store.dispatch("rehearsal/getallrehearsal");
  },
  computed: {
    ...mapGetters("rehearsal", {
      rehearsals: "rehearsals"
    })
  }
};
</script>

<style>
</style>