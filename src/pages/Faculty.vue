<template>
  <div>
    <div v-for="fac in facultys" :key="fac._id">
      <blog-detail-faculty :form="fac" @edit="edit" @del="del" />
    </div>
    <dialog-faculty
      :dialog="dialog"
      :form="form"
      :formStatus="formStatus"
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
      formStatus: false,
      form: {
        _id: "",
        id: "",
        name: ""
      },
      defaultForm: {
        _id: "",
        id: "",
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
      this.$store.dispatch("faculty/deletefaculty", id);
    },
    close() {
      this.dialogStatus = 0;
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
    },
    submit(form, status) {
      if (this.dialogStatus == 0 && status) {
        this.$store.dispatch("faculty/addfaculty", form);
      } else if (this.dialogStatus == 1 && status) {
        this.$store.dispatch("faculty/editfaculty", form);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch("faculty/getallfaculty");
  },
  computed: {
    ...mapState("faculty", {
      facultys: "facultys"
    })
  }
};
</script>

<style>
</style>