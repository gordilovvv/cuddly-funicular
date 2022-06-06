<script setup>
import { toRefs, useCssModule } from 'vue'

const styles = useCssModule('styles');

const props = defineProps({
    active: Boolean
});

const { active } = toRefs(props);
</script>

<template>
    <div :class="styles.item">
    
    </div>
</template>

<style lang="scss" module="styles">
@import './CurrencySwitcherItem.module.scss';
</style>