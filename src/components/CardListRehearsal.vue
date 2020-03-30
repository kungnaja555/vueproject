<template>
  <v-card class="mx-auto mt-4" width="50%">
    <v-row>
      <v-col>
        <div v-if="tab==0">
          <v-card-text>ชุดที่ {{form.no}}</v-card-text>
          <v-card-text>{{form.faculty.id}} - {{form.faculty.name}} ( {{form.major.id}} - {{form.major.name}} )</v-card-text>
          <!-- <v-card-text>เวลาเฉลี่ย 1.89 วินาที</v-card-text> -->
          <v-card-text>ไม่พบข้อมูล</v-card-text>
        </div>
        <div v-if="tab==1">
          <p>ไม่พบข้อมูล</p>
        </div>
      </v-col>
      <v-col cols="2">
        <v-icon class="mt-2 mr-2" @click="nextpage">visibility</v-icon>
        <v-icon class="mt-2 mr-2" @click="$emit('edit',form)">mdi-pencil</v-icon>
        <v-icon class="mt-2" @click="$emit('del',form)">mdi-delete</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "card-list-rehearsal",
  data() {
    return {};
  },
  props: {
    tab: Number,
    form: Object
  },
  methods: {
    nextpage() {}
  }
};
</script>

<style>
</style>