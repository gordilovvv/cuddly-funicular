<script setup>
import { computed } from 'vue'
import AssetIcon from '@/components/asset/icon/AssetIcon.vue'
import SafeShow from '@/components/asset/show/SafeShow.vue'
import { formatCurrency } from '@/utils/format/currency'
import { formatCoinQuantity } from '@/utils/format/coin'

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    chain: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    decimals: {
        type: Number,
        default: 2
    },
    price: {
        type: Object,
        required: true,
        default: () => ({
            value: 0,
            relativeChange24h: 0
        })
    },
    iconUrl: {
        type: String,
        required: true
    }
});

const link = computed(() => {
    return `/explore/${ props.id }`;
});

const quantity = computed(() => {
    return formatCoinQuantity(props.value, props.decimals);
});

const cost = computed(() => {
    return formatCurrency(props.value * props.price.value);
});
</script>

<template>
    <div :class="styles.item">
        <RouterLink
            :to="link"
            :class="styles.link"
        >

            <div :class="styles.metadata">
                <AssetIcon
                    :src="iconUrl"
                    :alt="symbol"
                />

                <div
                    :class="[
                        styles.metadataText,
                        { [styles.noChain]: !chain }
                    ]"
                >
                    <div :class="styles.symbol">
                        {{ symbol }}
                    </div>

                    <div
                        v-if="chain"
                        :class="styles.chain"
                    >
                        {{ chain }}
                    </div>
                </div>
            </div>

            <div :class="styles.text">
                {{ formatCurrency(price.value) }}
            </div>

            <div :class="styles.text">
                <SafeShow>
                    {{ quantity }}
                </SafeShow>
            </div>

            <div :class="[styles.text, styles.cost]">
                <SafeShow>
                    {{ cost }}
                </SafeShow>
            </div>
        
        </RouterLink>
    </div>
</template>

<style lang="scss" module="styles">
@import './CoinPreview.module.scss';
</style>