<template>
  <b-container fluid>
    <b-container fluid="sm" class="search-container">
      <b-row align-h="center" class="mt-5 mb-3">
        <b-col class="d-flex">
          <label for="subreddit-search" class="header-text mx-auto">{{
            headerText
          }}</label>
        </b-col>
      </b-row>
      <b-row
        id="subreddit-search"
        align-h="center"
        class="mb-3 flex-nowrap search-first-row"
      >
        <b-col md="4" class="self-align-center">
          <b-form-input
            class="search-input-group search-text-area"
            placeholder="Enter a subreddit"
            v-model="inputSubreddit"
            @keyup.enter="getTopPostsFromSubreddit"
          ></b-form-input>
        </b-col>
        <b-col md="2" class="self-align-center d-flex">
          <b-form-select
            class="search-input-group timeframe-select mx-auto"
            v-model="selectedTimeframe"
            :options="timeframeOptions"
            @change="getTopPostsFromSubreddit"
          >
          </b-form-select>
        </b-col>
        <b-col md="2" class="self-align-center d-flex">
          <b-button
            class="search-btn search-input-group shadow mx-auto"
            @click="getTopPostsFromSubreddit"
            >Search</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid="sm" class="mt-4">
      <b-row align-h="center">
        <b-col class="post-listing-col d-flex">
          <div class="mx-auto">
            <loader
              :loading="isFetchingPosts"
              :color="loaderColor"
              class="loader"
            ></loader>
          </div>
          <div v-if="!isFetchingPosts">
            <post-card
              v-for="post in posts"
              :key="post.id"
              :post="post"
            ></post-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { fetchTopPostsFromSubreddit } from "../apiService.js";
import PostCard from "./PostCard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

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
    loader: PulseLoader,
  },
  data() {
    return {
      posts: [],
      count: 0,
      error: null,
      inputSubreddit: null,
      currentSubreddit: null,
      selectedTimeframe: "Today",
      timeframeQueryMap,
      timeframeOptions: Object.keys(timeframeQueryMap),
      isFetchingPosts: false,
      loaderColor: "#6e6ec7",
    };
  },
  computed: {
    headerText() {
      if (this.currentSubreddit) {
        return `Top Posts on /r/${this.currentSubreddit}`;
      }
      return "Check out the top posts on your favorite subreddit!";
    },
  },
  methods: {
    getTopPostsFromSubreddit() {
      this.isFetchingPosts = true;
      this.currentSubreddit = this.inputSubreddit;
      fetchTopPostsFromSubreddit(
        this.inputSubreddit,
        this.timeframeQueryMap[this.selectedTimeframe],
        DEFAULT_LIMIT
      )
        .then((res) => {
          console.log(res);
          if (res && res.status == 200 && res.data) {
            this.posts = res.data.posts;
            console.log(this.posts);
            this.count = res.data.count || 0;
            this.error = null;
          }
          this.isFetchingPosts = false;
        })
        .catch((err) => {
          // this.error = err;
          console.log("ERROR");
          console.log(err.response);
          this.currentSubreddit = null;
          this.isFetchingPosts = false;
        });
    },
  },
};
</script>

<style>
:root {
  --blue-dark: rgb(40, 13, 192);
  --blue-light: rgb(9, 141, 194);
  --purple-light: rgba(110, 110, 199, 1);
}

.search-container {
  padding: 15px 0px;
  margin: 10px 0px;
  border-bottom: 4px var(--purple-light);
}

.header-text {
  font-family: "Montserrat", "Arial", sans-serif;
  font-size: 30px;
  font-weight: 400;
  text-align: center;
  background: -webkit-linear-gradient(
    90deg,
    var(--blue-dark) 25%,
    var(--purple-light) 75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.post-listing-col {
  max-width: 650px;
}

.search-text-area {
  max-width: 360px;
  min-width: 151px;
}

.timeframe-select {
  max-width: 100px;
}

.search-input-group {
  box-shadow: 0px 1px 4px 0px rgb(224, 224, 224);
  margin: 5px auto;
}

.search-input-group:focus {
  box-shadow: 0px 1px 2px 0px rgb(194, 194, 245);
  border-color: var(--purple-light);
}

.search-btn {
  background-color: var(--blue-dark) !important;
  box-shadow: 4px 5px 5px 5px solid rgb(75, 75, 75) !important;
  border-color: var(--purple-light) !important;
}

.search-btn:hover {
  background-color: var(--purple-light) !important;
  border-color: var(--purple-light) !important;
}

.loader {
  margin: auto;
  padding: 20px;
}
</style>
