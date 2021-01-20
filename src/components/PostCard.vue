<template>
  <b-container fluid="md" class="d-flex mb-3">
    <b-card no-body class="post-card mb-3" align-h="center">
      <b-card-body class="post-card-body">
        <b-card-title>{{ title }}</b-card-title>
        <b-card-sub-title class="mb-2">{{ getAuthor }}</b-card-sub-title>
        <b-card-text>{{ text }}</b-card-text>
        <b-card-img
          :src="getImageUrl"
          :alt="caption"
          v-if="getImageUrl && !isImgurGifv"
        ></b-card-img>
        <div class="embed-responsive embed-responsive-1by1" v-else>
          <iframe
            :src="getVideoUrl || getImageUrl"
            scrolling="no"
            frameborder="0"
            allow="fullscreen"
            allowfullscreen="true"
          ></iframe>
        </div>
        <div class="see-on-reddit">
          <a :src="permalink" class="see-on-reddit-link"
            >See post on Reddit 👀</a
          >
        </div>
      </b-card-body>
      <b-card-footer>
        <b-row class="footer-row">
          <span class="mx-auto">
            <img
              src="../assets/upvote.svg"
              class="votes-img"
              width="30"
              height="30"
            />
            <span>{{ this.ups }}</span>
          </span>
          <span class="mx-auto">
            <img
              src="../assets/downs.svg"
              class="votes-img"
              width="30"
              height="30"
            />
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
      bannedAtUtc: this.post.banned_at_utc,
      createdAtUtc: this.post.created_utc,
      permalink: this.post.permalink,
    };
  },
  computed: {
    getAuthor() {
      return `by ${this.post.author}`;
    },
    getImageUrl() {
      return this.post.images ? this.post.images[0].url : null;
    },
    getVideoUrl() {
      return this.post.video;
    },
    isImgurGifv() {
      if (this.post.images) {
        return this.post.images[0].url.endsWith(".gifv");
      }
      return false;
    },
  },
};
</script>

<style>
.post-card {
  width: 100%;
  box-shadow: 2px 5px 10px 2px rgb(170, 170, 170);
}

.post-card-body {
  padding: 16px 16px;
}

.see-on-reddit {
  margin: 10px 0 4px 0;
}

.see-on-reddit-link {
  color: black;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.see-on-reddit-link:hover {
  color: rgb(248, 91, 0);
  text-decoration: none;
}

.footer-row {
  white-space: nowrap;
}

.votes-img {
  margin: 0 8px;
}
</style>
