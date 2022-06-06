<script setup>
import { useCssModule } from 'vue'
import SafeShow from '@/components/asset/show/SafeShow.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { decomposeBalanceValue } from '@/utils/format/currency'

const styles = useCssModule('styles');

const portfolioStore = usePortfolioStore();

const {
    currency,
    integer,
    separator,
    decimal
} = decomposeBalanceValue(portfolioStore.assetsTotalFiat);
</script>

<template>
    <div :class="styles.balance">
        <SafeShow>

            <span :class="styles.amount">
                {{ currency }} {{ integer }}
            </span>

            <span :class="styles.ghost">
                {{ separator }}
            </span>

            <span :class="styles.ghost">
                {{ decimal }}
            </span>

        </SafeShow>
    </div>
</template>

<style lang="scss" module="styles">
@import './PortfolioBalance.module.scss';
</style>