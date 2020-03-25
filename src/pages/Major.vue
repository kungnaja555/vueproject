<template>
  <div>
    <div v-for="major in majors" :key="major._id">
      <blog-detail-faculty :form="major" @edit="edit" @del="del" />
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
        id: "",
        name: ""
      },
      defaultform: {
        _id: "",
        id: "",
        name: ""
      }
    };
  },
  methods: {
    edit(major) {
      this.dialogStatus = 1;
      this.form = Object.assign({}, major);
      this.dialog = true;
    },
    del(major) {
      var payout = {
        id: this.$route.params.id,
        form: major
      };
      this.$store.dispatch("major/deletemajor", payout);
    },
    close() {
      this.dialogStatus = 0;
      this.form = Object.assign({}, this.defaultform);
      this.dialog = false;
    },
    submit(form, status) {
      var payout = {
        id: this.$route.params.id,
        form: form
      };
      if (this.dialogStatus == 0 && status) {
        this.$store.dispatch("major/addmajor", payout);
      } else if (this.dialogStatus == 1 && status) {
        this.$store.dispatch("major/editmajor", payout);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch("major/getallmajor", this.$route.params.id);
  },
  computed: {
    ...mapState("major", {
      majors: "majors"
    })
  }
};
</script>

<style>
</style>