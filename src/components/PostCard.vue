<template>
  <b-container fluid="md">
    <b-card no-body style="max-width: 20rem;">
      <b-card-body>
        <b-card-title>{{ this.title }}</b-card-title>
        <b-card-sub-title class="mb-2">{{ getSubtitle }}</b-card-sub-title>
        <b-card-text>{{ this.text }}</b-card-text>
      </b-card-body>
      <b-card-img
        :src="getImageUrls"
        :alt="caption"
        :v-show="getImageUrl"
      ></b-card-img>
      <iframe
        :src="videoUrl"
        scrolling="no"
        frameborder="0"
        allow="fullscreen"
        allowfullscreen="true"
        :v-show="!getImageUrl"
      ></iframe>
      <b-card-footer>
        <b-row>
          <b-col md="6">
            <img src="../assets/upvote.svg" width="30" height="30" />
            <span>{{ this.ups }}</span>
          </b-col>
          <b-col md="6">
            <img src="../assets/downs.svg" width="30" height="30" />
            <span>{{ this.downs }}</span>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    author: null,
    title: null,
    text: null,
    imageUrls: null,
    videoUrl: null,
    caption: null,
    ups: null,
    downs: null,
  },
  data() {
    return {
      images: this.imageUrls,
    };
  },
  computed: {
    getImageUrl() {
      return this.images ? this.images[0] : null;
    },
    getSubtitle() {
      return `by ${this.author}`;
    },
  },
};
</script>

<style></style>
