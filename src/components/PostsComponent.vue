<template>
  <b-container fluid>
    <b-container fluid="sm" class="search-container mx-auto">
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
        class="mb-3 d-flex search-first-row"
      >
        <div class="d-flex flex-nowrap">
          <b-col md="4" class="self-align-center mx-auto">
            <b-form-input
              class="search-input-group search-text-area"
              placeholder="Enter a subreddit"
              v-model="inputSubreddit"
              @keyup.enter="getTopPostsFromSubreddit"
            ></b-form-input>
          </b-col>
          <b-col md="2" class="self-align-center d-flex mx-auto">
            <b-form-select
              class="search-input-group timeframe-select mx-auto"
              v-model="selectedTimeframe"
              :options="timeframeOptions"
              @change="getTopPostsFromSubreddit"
            >
            </b-form-select>
          </b-col>
        </div>
        <b-col md="2" class="self-align-center d-flex">
          <b-button
            class="search-btn search-input-group shadow mx-auto"
            @click="getTopPostsFromSubreddit"
            >Search</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid="sm" class="mt-1">
      <b-row align-h="center">
        <b-col class="post-listing-col d-flex">
          <div class="mx-auto">
            <loader
              :loading="isFetchingPosts"
              :color="loaderColor"
              class="loader"
            ></loader>
          </div>
          <div v-show="!isFetchingPosts && !fetchError">
            <post-card
              v-for="post in posts"
              :key="post.id"
              :post="post"
            ></post-card>
          </div>
          <div class="error" v-show="!isFetchingPosts && fetchError">
            <p>{{ this.fetchError }} 😑</p>
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

const DEFAULT_LIMIT = 50;
const DEFAULT_ERROR = "Something went wrong...";
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
      fetchError: null,
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
      if (this.currentSubreddit && !this.isFetchingPosts && !this.fetchError) {
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
          if (res && res.status == 200 && res.data) {
            this.posts = res.data.posts;
            this.count = res.data.count || 0;
            this.fetchError = null;
          }
          this.isFetchingPosts = false;
        })
        .catch((err) => {
          this.currentSubreddit = null;
          this.fetchError = err.response ? err.response.data : DEFAULT_ERROR;
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
  min-width: 85px;
}

.search-input-group {
  box-shadow: 0px 1px 4px 0px rgb(224, 224, 224);
  margin: 10px auto;
}

.search-input-group:focus {
  box-shadow: 0px 1px 2px 0px rgb(194, 194, 245);
  border-color: var(--purple-light);
}

.search-btn {
  background-color: var(--blue-dark) !important;
  box-shadow: 4px 5px 5px 5px solid rgb(75, 75, 75) !important;
  border-color: var(--purple-light) !important;
  margin: 30px auto;
}

@media only screen and (min-width: 768px) {
  .search-btn {
    margin: 10px auto;
  }
}

.search-btn:hover {
  background-color: var(--purple-light) !important;
  border-color: var(--purple-light) !important;
}

.loader {
  margin: auto;
  padding: 20px;
}

.error {
  color: rgb(74, 78, 136);
  font-size: 30px;
  margin: 30px auto;
  font-weight: 500;
  text-align: center;
}
</style>
