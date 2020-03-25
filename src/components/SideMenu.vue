<template>
  <v-card class="time-menu">
    <v-card-text>
      <div style="margin: 15px">
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="form.id" label="ชื่อย่อ" :rules="[v => !!v || 'กรุณากรอกข้อมูล']"></v-text-field>
          <v-text-field v-model="form.name" label="ชื่อ" :rules="[v => !!v || 'กรุณากรอกข้อมูล']"></v-text-field>
          <v-row>
            <v-col>
              <v-btn v-if="form.status == 0" color="primary" width="100%" @click="$emit('add', form)">เพิ่มข้อมูล</v-btn>
              <v-btn v-else color="primary" width="100%" @click="$emit('add', form)">แก้ไขข้อมูล</v-btn>
            </v-col>
            <v-col>
              <v-btn color="primary" width="100%" @click="$emit('resetform')">รีเซต</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "side-menu",
  props: {
    form: Object
  }
};
</script>

<style>
</style>