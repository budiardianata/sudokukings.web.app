<template>
  <main class="container mx-auto p-4">
    <breadcrumbs :title="blog.title" />
    <div class="flex flex-col justify-between gap-6 lg:flex-row-reverse">
      <aside ref="toc">
        <div
          v-if="blog.toc?.length > 0"
          tabindex="0"
          class="collapse lg:collapse-open sticky bg-base-200 top-20 my-6 xl:my-0 border border-base-300 bg-base-200 rounded-box"
        >
          <input type="checkbox" class="peer" />
          <h3 class="collapse-title text-xl text-center font-medium">
            Table Of Contents
          </h3>
          <ul class="collapse-content menu">
            <li
              v-for="link of blog.toc"
              :key="link.id"
              :class="{
                'pl-4': link.depth === 3
              }"
              @click="tableOfContentsHeadingClick(link)"
            >
              <a
                :class="{
                  active: link.id === currentlyActiveToc
                }"
                role="button"
                class="transition-colors duration-75"
                :href="`#${link.id}`"
              >
                <svg
                  v-if="link.depth === 3"
                  width="3"
                  height="24"
                  viewBox="0 -9 3 24"
                  class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                >
                  <path
                    d="M0 0L3 3L0 6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <article class="prose lg:prose-xl w-full max-w-4xl flex-grow mb-7">
        <h1>{{ blog.title }}</h1>
        <p>
          Last Update : <b>{{ formatDate(blog.updatedAt) }}</b>
        </p>
        <nuxt-content :document="blog" />
      </article>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const blog = await $content('/', params.slug).fetch()
    return {
      blog
    }
  },
  data() {
    return {
      currentlyActiveToc: '',
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id
        }
      })
    }, this.observerOptions)

    // Track all sections that have an `id` applied
    document
      .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
      .forEach((section) => {
        this.observer.observe(section)
      })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    tableOfContentsHeadingClick(link) {
      this.currentlyActiveToc = link.id
    }
  }
}
</script>
