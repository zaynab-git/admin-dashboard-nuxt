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

<script lang="ts">
import { computed, useContext  } from '@nuxtjs/composition-api'
import Locale from "../types/language"

export default {
    layout: 'Base',
    name: "Setting",
    
    setup () {

        const {app} = useContext()
        const i18n = app.i18n

        const availableLocales = computed ( () => i18n.locales as Locale[])
        const language = computed ({
            get() {
                return i18n.localeProperties.name
            },
            set(value: Locale) {
                i18n.setLocale(value.code)
            }
        })

        return {
            availableLocales,
            language,
        }
    }

}
</script>
