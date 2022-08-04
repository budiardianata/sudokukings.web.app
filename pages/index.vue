<template>
  <main>
    <section
      class="relative from-primary min-h-screen to-secondary text-primary-content -mt-[4rem] flex justify-center items-center place-items-center bg-gradient-to-br pt-20"
    >
      <div
        class="absolute right-0 inset-y-0 items-center justify-center w-2/3 max-h-screen overflow-hidden flex md:inset-y-0"
      >
        <svg viewBox="0 0 88 88" class="w-full max-w-screen-xl fill-secondary">
          <circle fill="fill-secondary" cx="44" cy="44" r="15.5" />
          <circle
            fill-opacity="0.2"
            fill="fill-secondary"
            cx="44"
            cy="44"
            r="44"
          />
          <circle
            fill-opacity="0.2"
            fill="fill-secondary"
            cx="44"
            cy="44"
            r="37.5"
          />
          <circle
            fill-opacity="0.3"
            fill="fill-secondary"
            cx="44"
            cy="44"
            r="29.5"
          />
          <circle
            fill-opacity="0.3"
            fill="fill-secondary"
            cx="44"
            cy="44"
            r="22.5"
          />
        </svg>
      </div>

      <div
        class="relative container flex flex-col-reverse md:space-x-6 md:flex-row justify-center items-center space-y-6 space-y-reverse mb-[40vh] w-full max-w-7xl flex-col justify-between xl:gap-20"
      >
        <div class="lg:pl-10 pb-20">
          <div class="mb-2 py-4 text-center lg:py-10 lg:text-left">
            <h1
              class="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl"
            >
              {{ data.app_name }}
            </h1>
            <h2
              class="font-title text-lg font-extrabold sm:text-2xl lg:text-3xl"
            >
              {{ data.app_description }}
            </h2>
          </div>
          <div
            class="flex w-full flex-col items-center space-y-10 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0"
          >
            <ul class="my-2 flex max-w-sm flex-col gap-2 text-left">
              <li
                v-for="(highlight, index) in data.app_highlight"
                :key="index"
                class="flex gap-2"
              >
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
                {{ highlight }}
              </li>
            </ul>
          </div>
          <div
            class="mt-4 flex flex-1 justify-center space-x-2 lg:mt-6 lg:justify-start"
          >
            <PlayButton :to="data.app_store_url" />
          </div>
        </div>
        <div>
          <img
            class="aspect-square w-40 md:w-56 object-contain hover:object-scale-down"
            :src="data.app_icon"
            :alt="data.app_name"
          />
        </div>
      </div>
    </section>
    <section
      class="mx-auto mockup-window text-base-content glass xl:rounded-box -mt-[40vh] grid max-w-screen-xl gap-4 bg-opacity-60 xl:pb-0"
    >
      <div
        class="flex w-full grid-flow-row grid-cols-12 items-center gap-4 overflow-y-hidden overflow-x-scroll px-10 pt-1 pb-10 xl:grid xl:overflow-x-auto xl:px-4"
      >
        <!--        mockup-phone-->
        <div
          v-for="(screenshot, index) in data.app_screenshot"
          :key="index"
          class="mockup-phone col-span-3 row-span-3 mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 xl:mx-0 xl:w-full"
        >
          <div class="camera"></div>
          <div class="display">
            <img
              class="artboard phone-1 object-contain hover:object-scale-down"
              :src="screenshot"
              :alt="data.app_name"
            />
          </div>
        </div>
        <!--        end mockup-phone-->
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const data = await $content('/index').fetch()
    return {
      data
    }
  },
  head() {
    const url = 'https://sudokukings.web.app'
    const structuredData = {
      '@type': 'Article',
      headline: this.data.title,
      image: this.data.image ? this.data.image : ''
    }
    const appStructure = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Sudoku Kings',
      operatingSystem: 'ANDROID',
      applicationCategory: 'GameApplication',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.6',
        ratingCount: '8864'
      }
    }
    const head = {
      title: this.data.app_name,
      link: [
        {
          rel: 'canonical',
          href: url
        },
        {
          rel: 'alternate',
          href: this.data.store_url
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: structuredData
        },
        {
          type: 'application/ld+json',
          json: appStructure
        }
      ],
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.data.app_name} - sudokukings.web.app`
        }
      ]
    }
    let description = this.data.app_name
    if (this.data.app_description) {
      description = this.data.app_description
    }
    head.meta.push(
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: description
      }
    )
    if (this.data.image) {
      head.meta.push({
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: this.data.image
      })
    }
    return head
  }
}
</script>
