<template>
  <b-container fluid="sm">
    <b-row align-h="center" class="mt-5 mb-3">
      <b-col class="d-flex">
        <label for="subreddit-search" class="mx-auto">Top Subreddits</label>
      </b-col>
    </b-row>
    <b-row id="subreddit-search" align-h="center" class="mb-3">
      <b-col md="4">
        <b-form-input
          placeholder="Enter a subreddit"
          v-model="inputSubreddit"
          @keyup.enter="getTopPostsFromSubreddit"
        ></b-form-input>
      </b-col>
      <b-col md="2">
        <b-form-select
          id="timeframe-select"
          v-model="selectedTimeframe"
          :options="timeframeOptions"
          @change="getTopPostsFromSubreddit"
        >
        </b-form-select>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mb-4">
      <b-button @click="getTopPostsFromSubreddit">Search</b-button>
    </b-row>
    <b-row align-h="center">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :post="post"
      ></post-card>
    </b-row>
  </b-container>
</template>

<script>
import { fetchTopPostsFromSubreddit } from "../apiService.js";
import PostCard from "./PostCard.vue";

const DEFAULT_LIMIT = 25;

const timeframeQueryMap = {
  Now: "now",
  Today: "today",
  Week: "week",
  Month: "month",
  All: "all",
};

export default {
  name: "PostsComponent",
  components: {
    "post-card": PostCard,
  },
  data() {
    return {
      posts: [],
      count: 0,
      error: null,
      inputSubreddit: null,
      selectedTimeframe: "Today",
      timeframeQueryMap,
      timeframeOptions: Object.keys(timeframeQueryMap),
    };
  },
  methods: {
    getTopPostsFromSubreddit() {
      console.log(this.timeframeQueryMap[this.selectedTimeframe]);
      fetchTopPostsFromSubreddit(
        this.inputSubreddit,
        this.timeframeQueryMap[this.selectedTimeframe],
        DEFAULT_LIMIT
      )
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            this.posts = res.data.posts;
            console.log(this.posts);
            this.count = res.data.count || 0;
            this.error = null;
          }
        })
        .catch((err) => {
          // this.error = err;
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
