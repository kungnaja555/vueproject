<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-row no-gutters>
        <v-col cols="11">
          <v-card-title>{{form.title}} - {{form.name}}</v-card-title>
          <v-card-text>
            <p>รหัส : {{form.id}}</p>
            <p>จำนวนบบัณฑิต : 500 คน</p>
          </v-card-text>
        </v-col>
        <v-col cols="1" v-if="$route.name == 'faculty'">
          <div class="text-center mt-4">
            <div class="my-2">
              <v-btn color="primary" fab small dark>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn color="error" fab small dark>
                <v-icon>delete</v-icon>
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn color="pink" fab small dark>
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="1" v-if="$route.name == 'time'">
          <div class="text-center mt-4">
            <div class="my-2">3 s</div>
          </div>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <div v-for="major in form.major" :key="major.id">
            <v-divider></v-divider>

            <v-row no-gutters>
              <v-col cols="11">
                <v-card-title>{{major.title}} - {{major.name}}</v-card-title>
                <v-card-text>
                  <p>รหัส : {{major.id}}</p>
                  <p>จำนวนบบัณฑิต : 150 คน</p>
                </v-card-text>
              </v-col>
              <v-col cols="1" v-if="$route.name == 'faculty'">
                <div class="text-center mt-4">
                  <div class="my-2">
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                  <div class="my-2">
                    <v-btn icon>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
              <v-col cols="1" v-if="$route.name == 'time'">
                <div class="text-center mt-4">
                  <div class="my-2">2 s</div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "blog-detail-faculty",
  data() {
    return {
      show: false
    };
  },
  props: {
    form: Object
  }
};
</script>

<style>
</style>