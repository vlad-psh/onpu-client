<template>
  <div class="browser-content">
    <template v-if="mode === 'index'">
      <input v-model="filterValue" />
      <div class="artists-list">
        <div v-for="a in filteredArtists" :key="'artist-' + a.id">
          <NuxtLink :to="'/artist/' + a.id">{{ a.title }}</NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const resp = await $axios.get('/api/index')
    return { artists: resp.data }
  },
  data() {
    return {
      mode: 'index',
      artist: {},
      artists: [],
      filterValue: '',
      abyssFolderId: 0,
      tracklists: { playlist: [], simple: [] },
    }
  }, // end of methods()
  computed: {
    filteredArtists() {
      if (this.filterValue) {
        const r = new RegExp(this.filterValue, 'i')
        return this.artists.filter(
          (i) => i.title.match(r) || (i.aliases && i.aliases.match(r))
        )
      } else {
        return this.artists
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.browser-content {
  .artists-list {
    column-width: 15em;
    padding: 1em;
  }
}
</style>
