<template>
  <nav aria-label="Breadcrumb" class="text-sm breadcrumbs">
    <ul vocab="https://schema.org/" typeof="BreadcrumbList">
      <li property="itemListElement" typeof="ListItem">
        <nuxt-link property="item" typeof="WebPage" to="/">
          <span property="name">Home</span>
        </nuxt-link>
        <meta property="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        property="itemListElement"
        typeof="ListItem"
      >
        <nuxt-link property="item" typeof="WebPage" :to="crumb.path">
          <span property="name" class="capitalize">
            {{
              $route.fullPath === crumb.path && title !== null
                ? title
                : crumb.title
            }}
          </span>
        </nuxt-link>
        <meta property="position" :content="index + 2" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index, arr) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title:
              Object.is(arr.length - 1, index) && this.title !== null
                ? this.title
                : param.replace(/-/g, ' '),
            active: Object.is(arr.length - 1, index),
            ...match
          })
        }
      })
      return crumbs
    }
  }
}
</script>
