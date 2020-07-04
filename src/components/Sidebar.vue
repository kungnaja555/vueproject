<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense nav>
      <div v-for="item in items" :key="item.title">
        <v-list-item @click="setRoute(item.name)" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      items: [
        { title: "การซ้อม", icon: "directions_walk", name: "rehearsal" },
        { title: "คณะ", icon: "business", name: "faculty" },
        { title: "จับเวลา", icon: "access_alarm", name: "start" }
      ]
    };
  },
  methods: {
    async setRoute(route) {
      if (this.$route.name != route) {
        this.$router.push({ name: route });
      }
    }
  },
  props: {
    drawer: Boolean
  }
};
</script>

<style>
</style>