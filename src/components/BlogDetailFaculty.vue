<template>
  <v-card class="mx-auto mt-4" width="40%">
    <v-row>
      <v-col>
        <v-card-text
          style="font-size: 18px"
          v-if="$route.name=='rehearsal'"
        >{{form.name}} - ปีการศึกษา {{form.years}}</v-card-text>
        <v-card-text style="font-size: 18px" v-else>{{form.id}} - {{form.name}}</v-card-text>
      </v-col>
      <v-col cols="3">
        <v-icon class="mt-4 mr-2" v-if="$route.name!='major'" @click="nextpage">visibility</v-icon>
        <v-icon class="mt-4 mr-2" @click="$emit('edit',form)">mdi-pencil</v-icon>
        <v-icon class="mt-4" @click="$emit('del',form)">mdi-delete</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "blog-detail-faculty",
  data() {
    return {};
  },
  props: {
    form: Object
  },
  methods: {
    nextpage() {
      if (this.$route.name == "faculty") {
        this.$router.push("/major/" + this.form._id);
      }
      if (this.$route.name == "rehearsal") {
        this.$router.push("/listrehearsal/" + this.form._id);
      }
    }
  }
};
</script>

<style>
</style>