<script setup>
import { toRefs, useCssModule } from 'vue'

const styles = useCssModule('styles');

const props = defineProps({
    active: Boolean 
});

const { active } = toRefs(props);

const emit = defineEmits({
    click: null
});
</script>

<template>
    <button
        type="button"
        :class="[
            styles.button,
            {
                [styles.active]: active
            }
        ]"
        @click="emit('click')"
    >
        
        <slot />

    </button>
</template>

<style lang="scss" module="styles">
@import './IconButton.module.scss';
</style>