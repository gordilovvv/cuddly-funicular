<script setup>
import { useCssModule } from 'vue'

const styles = useCssModule('styles');
</script>

<template>
    <div :class="styles.container">
        
        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './AppContainer.module.scss';
</style>