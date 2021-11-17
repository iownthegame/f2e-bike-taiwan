<template>
  <div class="content">
    <template v-if="activeMenuItem === 'routes'">
      <template v-if="!searchResultCount">
        <Search />
      </template>

      <template v-else>
        <SearchResult />
      </template>
    </template>

    <template v-else>
      {{ activeMenuItem }}
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from './Search.vue'
import SearchResult from './SearchResult.vue'

export default {
  name: 'Content',
  components: {
    Search,
    SearchResult
  },
  computed: {
    ...mapState(['activeMenuItem', 'searchResults']),
    searchResultCount() {
      return this.searchResults.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  position: relative;
}

</style>
