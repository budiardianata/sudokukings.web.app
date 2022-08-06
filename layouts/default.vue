<template>
  <div class="drawer">
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />
    <div
      ref="content"
      class="drawer-content flex flex-col scroll-smooth scroll-pt-[5rem]"
    >
      <TheHeader :menus="navLinks" :is-scroll="isScroll" />
      <Nuxt />
      <TheFooter :menus="navLinks" />
      <BackToTop :show-button="isScroll" />
    </div>
    <aside class="drawer-side">
      <label for="main-drawer" class="drawer-overlay"></label>
      <ul
        class="menu menu-compact flex flex-col overflow-y-auto w-80 bg-base-100 p-4"
      >
        <li v-for="(nav, index) in navLinks" :key="index">
          <nuxt-link :to="nav.url" :title="nav.link" class="flex gap-4">
            <span class="flex-none">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </span>
            <span class="flex-1">{{ nav.link }}</span>
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScroll: false,
      navLinks: [
        {
          url: '/privacy',
          link: 'Privacy'
        },
        {
          url: '/terms',
          link: 'Terms'
        }
      ]
    }
  },
  computed: {
    isHomepage() {
      return this.$route.path === '/'
    }
  },
  beforeMount() {
    document
      .querySelector('.drawer-content')
      .addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    document
      .querySelector('.drawer-content')
      .removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (this.$refs.content.scrollTop === 0) {
        window.location.hash = ''
      }
      this.isScroll = this.$refs.content.scrollTop > 200
    }
  }
}
</script>
