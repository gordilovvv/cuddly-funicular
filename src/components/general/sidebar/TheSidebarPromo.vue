<script setup>
import { useCssModule } from 'vue'
import { useI18n } from 'vue-i18n'
import CloseXs from '@icons/close-xs.svg'

const emit = defineEmits({
    hide: null
});

const { t } = useI18n();

const styles = useCssModule('styles');
</script>

<template>
    <!-- TODO: real url -->
    <RouterLink
        to="/"
        :class="styles.promo"
    >
        <div :class="styles.card" />

        <div :class="styles.wrap">

            <div 
                :class="styles.close"
                @click.prevent="emit('hide')"
            >
                <CloseXs />
            </div>

            <div :class="styles.title">
                {{ t('cryptoCardPromo.title') }}
            </div>

            <div :class="styles.text">
                {{ t('cryptoCardPromo.text') }}
            </div>

        </div>
    </RouterLink>
</template>

<style lang="scss" module="styles">
@import './TheSidebarPromo.module.scss';
</style>