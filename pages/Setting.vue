<template>
        <v-col class="ma-5">
            <v-row>
                <v-card>
                    <v-card-title>{{ $t("setting.language") }}</v-card-title>
                    <v-select
                    v-model="language"
                    :items="availableLocales"
                    item-text="name"
                    return-object
                    class="mx-3"
                    >
                    </v-select>
                </v-card>
            </v-row>
        </v-col>
</template>

<script>

export default {
    layout: 'Base',
    name: "Setting",
    data: () => ({
        //
    }),
    

    computed: {
        availableLocales () {
            return this.$i18n.locales
        },
        language: {
            get() {
                return this.$i18n.localeProperties.name
            },
            set(value) {
                this.$vuetify.rtl = (value.dir == 'rtl' ? true : false)
                this.$vuetify.lang.current = value.code
                this.$i18n.setLocale(value.code)
            }
        }
    }
}
</script>
