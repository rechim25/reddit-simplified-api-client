<template>
  <div></div>
</template>

<script>

import {fetchTopPostsFromSubreddit} from '../apiService.js'

export default {
    name: 'PostsComponent',
    data() {
        return {
            posts: [],
            count: 0,
        }
        
    },
    created() {
        fetchTopPostsFromSubreddit().then(res => {
            if (res && res.posts)
                this.posts = res.posts;
                this.count = res.count || 0;
        }).catch();
    }
}
</script>

<style>

</style>