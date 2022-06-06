<script setup>
import { useCssModule } from 'vue'
import CurrencySwitcherItem from './CurrencySwitcherItem.vue'
import VIcon from '@/components/common/icon/VIcon.vue'

const styles = useCssModule('styles');

const activeCurrency = {
    icon: '/images/fiat/usd.png',
    symbol: 'USD',
    ticker: 'usd'
}
</script>

<template>
    <div :class="styles.switcher">
    
        <div :class="styles.button">
            <div
                :class="styles.icon"
                :style="{ backgroundImage: `url(${ activeCurrency.icon })`}"
            />

            <div :class="styles.text">
                {{ activeCurrency.symbol }}
            </div>

            <div :class="styles.arrow">
                <VIcon name="arrow-down" />
            </div>
        </div>

        <div :class="styles.dropdownWrap">
            <div :class="styles.dropdown">
                    
            </div>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './CurrencySwitcher.module.scss';
</style>