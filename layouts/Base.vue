<template>
    <v-app>
        <app-bar/>
        <app-drawer/>
            <v-main
            :dir="this.$i18n.localeProperties.dir">
                <Nuxt/>
            </v-main>
    </v-app>

</template>

<script lang="ts">
import AppBar from '../components/AppBar.vue'
import AppDrawer from '../components/AppDrawer.vue'
import { onMounted, useStore } from '@nuxtjs/composition-api'


export default {
    name: 'Base',
    components: { AppBar, AppDrawer },
    middleware: ['authentication'],
    setup() {

        const store = useStore()

        const get_user = () => {
            store.dispatch('GET_USER')
        }
        onMounted(get_user)

        return {
            get_user
        }
    }
}
</script>
