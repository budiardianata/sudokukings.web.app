<template>
  <button
    v-show="showButton && !isHomepage"
    class="fixed z-10 p-3 bg-primary text-primary-content rounded-full shadow-md bottom-10 right-10 animate-bounce transition-opacity duration-300 ease-in-out"
    type="button"
    aria-label="Scroll To top"
    @click="toggleScroll"
  >
    <span class="sr-only">Scroll To Top</span>
    <svg
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      class="inline-block h-6 w-6 fill-current"
    >
      <path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    showButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isHomepage() {
      return this.$route.path === '/'
    }
  },
  methods: {
    toggleScroll() {
      if (this.showButton) {
        document
          .querySelector('.drawer-content')
          .scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>
