<template>
  <div></div>
</template>

<script>
import Cookies from 'js-cookie'
import ubeat from '@/js/apis/ubeat'

export default {
  name: 'dynamicPlaylists',
  async beforeMount () {
    const cookie = Cookies.get('uBeatCookie')
    if (cookie) {
      const user = await ubeat.tokenInfo(cookie)
      this.$router.push(`/users/${user.id}/playlists`)
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
