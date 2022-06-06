<script setup>
import { useCssModule } from 'vue'
import { formatTsToBeautifulDate } from '@/utils/format/date'

const styles = useCssModule('styles');

const props = defineProps({
    dayTs: {
        type: Number,
        required: true
    }
});

const date = formatTsToBeautifulDate(props.dayTs);
</script>

<template>
    <div :class="styles.group">

        <div :class="styles.title">
            {{ date }}
        </div>

        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './TransactionGroup.module.scss';
</style>