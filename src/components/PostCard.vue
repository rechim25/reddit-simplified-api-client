<template>
  <b-container fluid="md" class="d-flex mb-3">
    <b-card no-body class="post-card mb-3" align-h="center">
      <b-card-body>
        <b-card-title>{{ title }}</b-card-title>
        <b-card-sub-title class="mb-2">{{ getAuthor }}</b-card-sub-title>
        <b-card-text>{{ text }}</b-card-text>
      </b-card-body>
      <b-card-img
        :src="getImage"
        :alt="caption"
        :v-show="getImage"
      ></b-card-img>
      <div class="embed-responsive embed-responsive-1by1" :v-show="showVideo">
      <iframe
        class="video-iframe"
        :src="getVideoUrl"
        scrolling="no"
        frameborder="0"
        allow="fullscreen"
        allowfullscreen="true"
      ></iframe>
      </div>
      <b-card-footer>
        <b-row class="footer-row">
          <span class="mx-auto">
            <img src="../assets/upvote.svg" class="votes-img" width="30" height="30" />
            <span>{{ this.ups }}</span>
          </span>
          <span class="mx-auto">
            <img src="../assets/downs.svg" class="votes-img" width="30" height="30" />
            <span>{{ this.downs }}</span>
          </span>
        </b-row>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: null,
  },
  data() {
    return {
      title: this.post.title,
      text: this.post.text,
      video: this.post.video,
      caption: this.post.caption,
      ups: this.post.ups,
      downs: this.post.downs,
    };
  },
  computed: {
    getAuthor() {
      return `by ${this.post.author}`;
    },
    getImage() {
      return this.post.images ? this.post.images[0] : null;
    },
    getVideoUrl() {
      return this.post.video ? this.post.video.url : null;
    },
    showVideo() {
      return this.video && this.video !== {} && this.video != undefined;
    }
  },
};
</script>

<style>
.post-card {
  width:100%;
}

.video-iframe {

}

.footer-row {
  white-space: nowrap;
}

.votes-img {
  margin: 0 8px;
}
</style>
