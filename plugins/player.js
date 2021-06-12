import Vue from 'vue'

export default (context, inject) => {
  const player = new Vue({
    data() {
      return {
        mPlayer: null,
      }
    },
    computed: {
      nowPlaying() {
        return this.mPlayer && this.mPlayer.nowPlaying
          ? this.mPlayer.nowPlaying
          : {}
      },
    },
    methods: {
      startPlaylist(playlist, uid) {
        playlist = playlist.map((i) => this.trackObject(i))
        const idx = playlist.findIndex((i) => i.uid === uid)
        if (this.mPlayer)
          this.mPlayer.startPlaylist(this.splitArray(playlist, idx), uid)
      },
      splitArray(arr, idx) {
        return [].concat(
          arr.slice(idx, arr.length),
          idx !== 0 ? arr.slice(0, idx) : []
        )
      },
      trackObject(track) {
        return {
          uid: track.uid,
          title: track.title,
          artist: this.title,
          rating: track.rating,
          src: `/download/audio/${track.uid}`,
        }
      },
    },
  })
  inject('player', player)
}
