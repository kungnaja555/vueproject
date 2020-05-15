<template>
  <div>
    <div style="font-size:25px;">คณะ</div>
    <div v-for="fac in facultys" :key="fac._id">
      <v-card class="mx-auto mt-4" width="40%">
        <v-row>
          <v-col>
            <v-card-text style="font-size: 18px">{{fac.id}} - {{fac.name}}</v-card-text>
          </v-col>
          <v-col cols="3">
            <v-icon class="mt-4 mr-2" @click="nextPage(fac)">visibility</v-icon>
            <v-icon class="mt-4 mr-2" @click="edit(fac)">mdi-pencil</v-icon>
            <v-icon class="mt-4" @click="del(fac)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <dialog-faculty
      :dialog="dialog"
      :form="form"
      :dialogTitle="dialogTitle"
      @submit="submit"
      @close="close"
    />

    <dialog-delete :dialog="dialogDel" @sure="sure" @close="close" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogDel: false,
      dialog: false,
      dialogTitle: 0,
      search: "",
      form: {
        id: "",
        name: ""
      },
      defaultForm: {
        id: "",
        name: ""
      }
    };
  },
  methods: {
    edit(fac) {
      this.dialogTitle = 1;
      this.form = Object.assign({}, fac);
      this.dialog = true;
    },
    del(fac) {
      this.form = Object.assign({}, fac);
      this.dialogDel = true;
    },
    sure() {
      this.$store.dispatch("faculty/deleteFaculty", this.form._id);
      this.close();
    },
    close() {
      this.dialogTitle = 0;
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.dialogDel = false;
    },
    submit(form) {
      if (this.dialogTitle == 0) {
        this.$store.dispatch("faculty/addFaculty", form);
      } else if (this.dialogTitle == 1) {
        this.$store.dispatch("faculty/editFaculty", form);
      }
      this.close();
    },
    nextPage(fac) {
      var fac_id = fac._id;
      this.$router.push(`/set/${fac_id}`);
    }
  },
  created() {
    this.$store.dispatch("faculty/getAllFaculty");
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