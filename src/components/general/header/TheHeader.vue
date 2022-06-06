<script setup>
import { ref, useCssModule } from 'vue'
import { useI18n } from 'vue-i18n'
import AppContainer from '@/components/AppContainer.vue'
import AppPopup from '@/components/popup/AppPopup.vue'
import GlobalSettings from '@/components/popup/views/settings/GlobalSettings.vue'
import IconButton from '@/components/general/IconButton.vue'
import VButton from '@/components/common/button/VButton.vue'
import VIcon from '@/components/common/icon/VIcon.vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'

const styles = useCssModule('styles');
const route = useRoute();
const mainStore = useMainStore();
const userStore = useUserStore();
const { t } = useI18n();

const firstName = userStore.name.split(' ')[0] ?? userStore.name;

const toggleBalances = () => {
    mainStore.hideBalances = !mainStore.hideBalances;
}

const settings = ref(null);
const isSettingsMenuVisible = ref(false);

const toggleSettingsMenu = () => {
    isSettingsMenuVisible.value = !isSettingsMenuVisible.value;
}
</script>

<template>
    <div :class="styles.header">
        <AppContainer>
            <div :class="styles.wrap">
            
                <div :class="styles.title">
                    {{ route.meta.title ?? t('hello', { name: firstName }) }}
                </div>

                <div :class="styles.side">
                    <VButton
                        size="small"
                        :class="styles.button"
                    >
                        <template #icon>
                            <VIcon name="usdt" />
                        </template>

                        {{ t('buyItem', { item: 'USDT' }) }}
                    </VButton>

                    <IconButton
                        :class="styles.button"
                        @click="toggleBalances"
                    >
                        <VIcon
                            v-if="mainStore.hideBalances"
                            name="eye-off"
                        />
                        <VIcon
                            v-else
                            name="eye"
                        />
                    </IconButton>

                    <div
                        ref="settings"
                        :class="styles.button"
                    >
                        <IconButton @click="toggleSettingsMenu">
                            <VIcon name="settings" />
                        </IconButton>
                    </div>
                </div>

            </div>
        </AppContainer>
    </div>

    <AppPopup
        v-model="isSettingsMenuVisible"
        type="pane"
        :pane-activator="settings"
    >
        <GlobalSettings />
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './TheHeader.module.scss';
</style>