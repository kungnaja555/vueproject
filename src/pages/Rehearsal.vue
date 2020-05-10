<template>
  <div>
    <div style="font-size:25px;">การซ้อม</div>
    <v-btn class="button-add" width="100px" @click.stop="dialog = true" color="primary">+ เพิ่ม</v-btn>
    <div v-for="rehearsal in rehearsals" :key="rehearsal._id">
      <card-rehearsal :form="rehearsal" @edit="edit" @del="del" />
    </div>
    <dialog-faculty
      :dialog="dialog"
      :form="form"
      :dialogTitle="dialogTitle"
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
      dialogTitle: 0,
      form: {
        years: "",
        name: "",
        date: ""
      },
      defaultform: {
        years: "",
        name: "",
        date: ""
      }
    };
  },
  methods: {
    edit(re) {
      this.dialogTitle = 1;
      this.form = Object.assign({}, re);
      this.dialog = true;
    },
    del(re) {
      var id = re._id;
      this.$store.dispatch("rehearsal/deleteRehearsal", id);
    },
    close() {
      this.dialogTitle = 0;
      this.form = Object.assign({}, this.defaultform);
      this.dialog = false;
    },
    submit(form) {
      if (this.dialogTitle == 0) {
        this.$store.dispatch("rehearsal/addRehearsal", form);
      } else if (this.dialogTitle == 1) {
        this.$store.dispatch("rehearsal/editRehearsal", form);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch("rehearsal/getAllRehearsal");
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