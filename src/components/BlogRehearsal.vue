<template>
  <v-card class="mx-auto" max-width="800" outlined @click="gotoqueue(rehearsal._id)">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{rehearsal.name}} - ปีการศึกษา {{rehearsal.years}}</v-list-item-title>
        <v-list-item-subtitle>{{formatdatetime(rehearsal.date)}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "blog-rehearsal",
  props: {
    rehearsal: Object
  },
  methods: {
    formatdatetime(date) {
      return `${new Date(date).getDate()}-${new Date(
        date
      ).getMonth()}-${new Date(date).getFullYear()}`;
    },
    gotoqueue(id){
        this.$router.push(`/time/${id}`)
    }
  }
};
</script>
