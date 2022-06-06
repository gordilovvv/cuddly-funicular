<script setup>
import { useCssModule } from 'vue'
import VButton from '@/components/common/button/VButton.vue';
import { useI18n } from 'vue-i18n';

const styles = useCssModule('styles');
const { t } = useI18n();

// TODO: verification
</script>

<template>
    <div :class="styles.alert">

        <div :class="styles.text">
            {{ t('verificationAlert') }}
        </div>

        <VButton
            size="small"
            view="filled"
            :class="styles.button"
        >
            {{ t('button.confirm') }}
        </VButton>

    </div>
</template>

<style lang="scss" module="styles">
@import './VerificationAlert.module.scss';
</style>