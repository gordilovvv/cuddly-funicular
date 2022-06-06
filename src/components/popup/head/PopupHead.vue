<script setup>
import { inject } from 'vue'
import IconButton from '@/components/general/IconButton.vue'
import VIcon from '@/components/common/icon/VIcon.vue'

const close = inject('close');
</script>

<template>
    <div :class="styles.head">

        <div :class="styles.title">
            <slot />
        </div>

        <IconButton
            :class="styles.button"
            @click="close"
        >
            <VIcon name="close" />
        </IconButton>

    </div>
</template>

<style lang="scss" module="styles">
@import './PopupHead.module.scss';
</style>