<script setup>
import { h, nextTick, ref, useSlots, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { createBlurSvg } from '@/services/safeShow'

const slots = useSlots();
const mainStore = useMainStore();

const div = ref(null);
const blurHeight = ref(0);

const { hideBalances } = storeToRefs(mainStore);

watch(hideBalances, async (hidden) => {
    if (!hidden)
        return;
    
    if (!div.value)
        await nextTick();

    const { fontSize } = getComputedStyle(div.value.parentNode);

    blurHeight.value = parseInt(fontSize);
}, {
    immediate: true
});

const render = () => !hideBalances.value
    ? slots.default()
    : h(
        'div', {
            ref: div,
            style: {
                height: `${ blurHeight.value }px`,
                fontSize: `${ blurHeight.value }px`
            }
        },
        [
            createBlurSvg(blurHeight.value)
        ]
    );
</script>

<template>
    <render />
</template>