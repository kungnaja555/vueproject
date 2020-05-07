<template>
  <v-card class="mx-auto" width="85%" height="300px">
    <v-card-text>
      <div style="font-size: 30px">{{this.$route.name=='list'?form.title:`ชุดที่ ${form.no}`}}</div>
      <div class="mt-2">{{form.detail}}</div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <div v-for="fac in form.facultys" :key="fac._id">{{fac.name}}</div>
    </v-card-text>

    <v-footer absolute style="background-color: white;">
      <v-btn text color="primary" @click="$emit('nextPage',form)">ดูรายละเอียด</v-btn>
      <v-btn text color="success" @click="$emit('edit',form)">แก้ไข</v-btn>
      <v-btn text color="error" @click="$emit('del',form)">ลบ</v-btn>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "card-list-set",
  data() {
    return {};
  },
  props: {
    form: Object
  }
};
</script>

<style>
</style>