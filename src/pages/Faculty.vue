<template>
  <div>
    <div v-for="form in forms" :key="form.id">
      <blog-detail-faculty :form="form" />
    </div>
    <button-add @clickadd="clickadd" />
    <dialog-faculty :dialog="dialog" :form="form" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: {
        id: '',
        title: '',
        name: '',
        major: {
          id: '',
          title: '',
          name: ''
        }
      },
      forms: [
        {
          id: "16",
          title: "IF",
          name: "วิทยาการสารสนเทศ",
          major: [
            {
              id: "886",
              title: "CS",
              name: "วิทยาการคอมพิวเตอร์"
            },
            {
              id: "887",
              title: "IT",
              name: "เทคโนโลยีสารสนเทศ"
            }
          ]
        }
      ]
    };
  },
  methods: {
    clickadd() {

      this.dialog = !this.dialog;
    }
  }
};
</script>

<style>
</style>