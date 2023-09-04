<template>
  <div>
    <v-file-input
      type="file"
      accept="image/*"
      @change="previewImage"
      v-model="image"
    />
    <v-img :src="url"></v-img>
  </div>
</template>

<script>
export default {
  data: () => ({
    url: null,
    image: null,
  }),
  methods: {
    previewImage() {
      this.url = URL.createObjectURL(this.image);
    },
  },
};
</script>