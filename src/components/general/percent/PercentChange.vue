<script setup>
import { computed, toRefs, useCssModule } from 'vue'
import { formatPercent } from '@/utils/format/percent'

const styles = useCssModule('styles');

const props = defineProps({
    value: {
        type: [String, Number],
        required: true
    }
});

const { value } = toRefs(props);

const percent = computed(() => {
    return formatPercent(value.value);
});

const classes = computed(() => {
    return [styles.percent, {
        [styles.green]: value.value > 0,
        [styles.red]: value.value < 0
    }];
});
</script>

<template>
    <div :class="classes">

        <div :class="styles.text">
            {{ percent }}
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './PercentChange.module.scss';
</style>