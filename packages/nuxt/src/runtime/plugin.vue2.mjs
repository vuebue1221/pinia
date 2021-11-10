import { createPinia, setActivePinia, PiniaVuePlugin } from 'pinia'
import Vue from 'vue'

// @ts-ignore
Vue.use(PiniaVuePlugin)

export default function (context, inject) {
  const pinia = createPinia()
  context.app.pinia = pinia
  inject('pinia', pinia)
  setActivePinia(pinia)

  pinia._p.push(({ store }) => {
    // Make it non enumerable so it avoids any serialization and devtools
    Object.defineProperty(store, '$nuxt', { value: context })
  })

  // Hydrate state
  if (process.server) {
    context.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.pinia = pinia.state.value
    })
  } else if (context.nuxtState && context.nuxtState.pinia) {
    pinia.state.value = context.nuxtState.pinia
  }
}
