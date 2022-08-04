<template>
  <header
    class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100"
    :class="{
      'bg-base-100 text-base-content text-primary-content':
        !isHomepage && !isScroll,
      'bg-base-100 text-base-content shadow-sm': !isHomepage && isScroll,
      'bg-base-100 text-base-content shadow-sm': isHomepage && isScroll,
      'text-primary-content': isHomepage && !isScroll
    }"
  >
    <nav class="navbar w-full justify-between container mx-auto space-x-2">
      <div class="flex flex-1 md:gap-1 lg:gap-2">
        <span
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip="Menu"
          :class="{
            hidden: isHomepage,
            'lg:hidden block': !isHomepage
          }"
        >
          <label
            for="main-drawer"
            class="btn btn-square btn-ghost drawer-button"
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </span>
        <NuxtLink
          to="/"
          class="text-primary-content font-semibold text-xl ml-4"
          :class="{
            hidden: isHomepage,
            block: !isHomepage
          }"
          >Sudoku Kings
        </NuxtLink>
      </div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
          <li
            v-for="(nav, index) in menus"
            :key="index"
            :class="{
              bordered: $route.path === nav.url
            }"
          >
            <NuxtLink :to="nav.url" :title="nav.link">
              {{ nav.link }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="inline-flex">
        <div class="dropdown dropdown-end">
          <button
            tabindex="0"
            type="button"
            class="btn gap-1 normal-case btn-ghost"
          >
            <Component
              :is="'system'"
              class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            />
            <span class="hidden">Theme</span>
          </button>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li v-for="(theme, index) in themes" :key="index">
              <a
                role="button"
                tabindex="0"
                :data-set-theme="theme.id"
                data-act-class="active"
              >
                <Component
                  :is="theme.id"
                  class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                />
                {{ theme.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { themeChange } from 'theme-change'

export default {
  props: {
    menus: {
      type: Array,
      default: null
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      themes: [
        { id: 'system', name: 'Auto' },
        { id: 'light', name: 'light' },
        { id: 'dark', name: 'dark' }
      ]
    }
  },
  computed: {
    isHomepage() {
      return this.$route.path === '/'
    }
  },
  mounted() {
    themeChange(false)
  }
}
</script>
