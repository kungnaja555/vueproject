<template>
  <div>
    <div v-for="rehearsal in rehearsals" :key="rehearsal._id">
      <blog-detail-faculty :form="rehearsal" @edit="edit" @del="del" />
    </div>
    <dialog-faculty
      :dialog="dialog"
      :form="form"
      :formstatus="formstatus"
      @submit="submit"
      @close="close"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      dialogStatus: 0,
      formstatus: false,
      form: {
        _id: "",
        years: "",
        name: ""
      },
      defaultform: {
        _id: "",
        years: "",
        name: ""
      }
    };
  },
  methods: {
    edit(fac) {
      this.dialogStatus = 1;
      this.form = Object.assign({}, fac);
      this.dialog = true;
    },
    del(fac) {
      var id = fac._id;
      this.$store.dispatch("rehearsal/deleterehearsal", id);
    },
    close() {
      this.dialogStatus = 0;
      this.form = Object.assign({}, this.defaultform);
      this.dialog = false;
    },
    submit(form, status) {
      if (this.dialogStatus == 0 && status) {
        this.$store.dispatch("rehearsal/addrehearsal", form);
      } else if (this.dialogStatus == 1 && status) {
        this.$store.dispatch("rehearsal/editrehearsal", form);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch("rehearsal/getallrehearsal");
  },
  computed: {
    ...mapState("rehearsal", {
      rehearsals: "rehearsals"
    })
  }
};
</script>

<style>
</style>