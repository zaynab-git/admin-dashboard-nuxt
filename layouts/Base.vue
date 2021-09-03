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

<script>
import AppBar from '../components/AppBar.vue'
import AppDrawer from '../components/AppDrawer.vue'

export default {
    name: 'Base',
    components: { AppBar, AppDrawer },
    middleware: ['authentication'],
    mounted() {
        this.$store.dispatch('GET_USER')
    }
}
</script>
