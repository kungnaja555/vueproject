<template>
  <div>
    <router-link :to="`/faculty`">ย้อนกลับ</router-link>
    <div style="font-size: 25px">{{faculty.id}} - {{faculty.name}}</div>
    
    <div v-for="oneset in sets" :key="oneset._id">
      <v-card class="mx-auto mt-4" width="40%">
        <v-row>
          <v-col>
            <v-card-text
              style="font-size: 18px"
            >ชุดที่ {{oneset.contents[0].name}} - ปีการศึกษา {{oneset.contents[0].years}}</v-card-text>
          </v-col>
          <v-col cols="3">
            <v-icon class="mt-4 mr-2" @click="nextPage(oneset)">visibility</v-icon>
            <v-icon class="mt-4 mr-2" @click="edit(oneset)">mdi-pencil</v-icon>
            <v-icon class="mt-4" @click="del(oneset)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <dialog-set
      :dialog="dialog"
      :set="set"
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
      set: {
        _id: "",
        con_id: "",
        name: "",
        years: ""
      },
      defaultset: {
        _id: "",
        con_id: "",
        name: "",
        years: ""
      },
      dialog: false,
      dialogTitle: 0
    };
  },
  methods: {
    edit(set) {
      this.dialogTitle = 1;
      var content = set.contents.find(el => el.rehearsal == null);
      this.set._id = set._id;
      this.set.con_id = content._id;
      this.set.name = content.name;
      this.set.years = content.years;
      this.dialog = true;
    },
    del(set) {
      this.set = Object.assign({}, set);
      this.dialogDel = true;
    },
    sure() {
      var payout = {
        fac_id: this.$route.params.fac_id,
        set: this.set
      };
      this.$store.dispatch("set/deleteSet", payout);
      this.close()
    },
    submit(set) {
      var payout = {
        fac_id: this.$route.params.fac_id,
        set: set
      };
      if (this.dialogTitle == 0) {
        this.$store.dispatch("set/addSet", payout);
        this.close();
      } else {
        this.$store.dispatch("set/editSet", payout);
        this.close();
      }
    },
    close() {
      this.dialogTitle = 0;
      this.set = Object.assign({}, this.defaultset);
      this.dialog = false;
      this.dialogDel = false;
    },
    nextPage(set) {
      var fac_id = this.$route.params.fac_id;
      var set_id = set._id;
      this.$router.push(`/pundit/${fac_id}/${set_id}`);
    }
  },
  created() {
    this.$store.dispatch("set/getAllSet", this.$route.params.fac_id);
    this.$store.dispatch("faculty/getFaculty", this.$route.params.fac_id);
  },
  computed: {
    ...mapState("set", {
      sets: "sets"
    }),
    ...mapState("faculty", {
      faculty: "faculty"
    })
  }
};
</script>

<style>
</style>