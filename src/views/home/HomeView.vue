<script setup>
import { computed, ref, useCssModule } from 'vue'
import { useI18n } from 'vue-i18n'
import CoinPreview from '@/components/asset/preview/CoinPreview.vue'
import HomeAction from '@/components/home/action/HomeAction.vue'
import HomeBalance from '@/components/home/balance/HomeBalance.vue'
import TabsBlock from '@/components/tabs/block/TabsBlock.vue'
import TabsItem from '@/components/tabs/item/TabsItem.vue'
import VSwitch from '@/components/common/switch/VSwitch.vue'
import { useRealtimePortfolioAssetsUpdate, useRealtimePortfolioTransactionsUpdate } from '@/services/api/realtime/portfolio'
import TransactionGroup from '@/components/transaction/group/TransactionGroup.vue'
import TransactionItem from '@/components/transaction/item/TransactionItem.vue'

const styles = useCssModule('styles');
const { t } = useI18n();

const TAB_ASSETS_TYPE = 'assets';
const TAB_HISTORY_TYPE = 'history';

const hideSmallBalances = ref(false);

const [ assets ] = useRealtimePortfolioAssetsUpdate();
const [ transactions ] = useRealtimePortfolioTransactionsUpdate();

const filteredAssets = computed(() => {
    return hideSmallBalances.value
        ? assets.value.filter(({ value }) => value > 0)
        : assets.value;
});
</script>

<template>
    <HomeBalance />

    <div :class="styles.actions">
        <div :class="styles.actionsList">
            <!-- TODO: real url -->
            <HomeAction
                to="/"
                icon="card"
            >
                {{ t('orderCryptoCard') }}
            </HomeAction>

            <HomeAction
                to="/swap"
                icon="swap"
            >
                {{ t('exchangeCurrency') }}
            </HomeAction>

            <HomeAction
                to="/withdrawal"
                icon="withdrawal"
            >
                {{ t('withdrawalCurrency') }}
            </HomeAction>

            <HomeAction
                to="/deposit"
                icon="deposit"
            >
                {{ t('depositAccount') }}
            </HomeAction>
        </div>
    </div>

    <TabsBlock :class="styles.tabs">
        <template #head="{ activeTab }">
            <div
                v-if="activeTab === TAB_ASSETS_TYPE"
                :class="styles.switch"
            >
                <div :class="styles.switchText">
                    {{ t('hideSmallBalances') }}
                </div>

                <VSwitch v-model:checked="hideSmallBalances" />
            </div>
        </template>
        
        <template #body>
            <TabsItem
                :type="TAB_ASSETS_TYPE"
                title="assets"
            >
                <div :class="styles.tableCols">
                    <div :class="styles.col">
                        {{ t('asset') }}
                    </div>

                    <div :class="styles.col">
                        {{ t('price') }}
                    </div>

                    <div :class="styles.col">
                        {{ t('quantity') }}
                    </div>

                    <div :class="styles.col">
                        {{ t('cost') }}
                    </div>
                </div>

                <CoinPreview
                    v-for="asset in filteredAssets"
                    :key="asset.id"
                    v-bind="asset"
                />
            </TabsItem>


            <TabsItem
                :type="TAB_HISTORY_TYPE"
                title="txHistory"
            >
                <TransactionGroup
                    v-for="({ dayTs, txs }) in transactions"
                    :key="dayTs"
                    :day-ts="dayTs"
                >
                    <TransactionItem
                        v-for="({ id, ...tx }) in txs"
                        :key="id"
                        v-bind="tx"
                    />
                </TransactionGroup>
            </TabsItem>
        </template>
    </TabsBlock>
</template>

<style lang="scss" module="styles">
@import './HomeView.module.scss';
</style>