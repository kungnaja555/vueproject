<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.id"
                label="รหัส"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.title"
                label="ชื่อย่อ"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field 
              v-model="form.name" 
              label="คณะ" 
              required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'dialog-major',
    data(){
        return{
            valid: true,
            form: {
                id: '',
                title: '',
                name: ''
            }
        }
    } 
};
</script>

<style>
</style>