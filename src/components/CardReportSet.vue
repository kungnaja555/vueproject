<template>
  <v-card class="mx-auto mt-4" width="90%">
    <v-row>
      <v-col>
        <v-card-text>ชุดที่ {{set.no}}</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-actions>
          <v-btn icon @click="$emit('nextPage',set)">
            <v-icon>access_time</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('getReportData',set)">
            <v-icon>fas fa-angle-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "card-report-set",
  props: {
    set: Object
  }
};
</script>

<style>
</style>