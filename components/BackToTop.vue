<template>
  <button
    v-show="showButton && !isHomepage"
    class="fixed z-10 p-3 bg-primary text-white rounded-full shadow-md bottom-10 right-10 animate-bounce transition-opacity duration-300 ease-in-out"
    aria-label="Scroll To top"
    @click="toggleScroll"
  >
    <p class="sr-only">Scroll To Top</p>
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block h-6 w-6 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
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
