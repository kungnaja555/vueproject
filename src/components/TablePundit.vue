<template>
  <v-card class="mx-auto" width="80%" height="88vh">
    <v-card-title>
      จัดการบัณฑิต
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :items-per-page="13"
      hide-default-footer
      disable-sort
    >
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="pundit=item">edit</v-icon>
        <v-icon small>delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "table-pundit",
  data() {
    return {
      search: "",
      pundit: '',
     
    };
  },
  props: {
    headers: Array,
    desserts: Array
  }
};
</script>

<style>
</style>