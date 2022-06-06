<script setup>
import { useCssModule } from 'vue'

const styles = useCssModule('styles');

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div :class="styles.icon">

        <img
            :src="props.src"
            :alt="props.alt"
        />
        
    </div>
</template>

<style lang="scss" module="styles">
@import './AssetIcon.module.scss';
</style>