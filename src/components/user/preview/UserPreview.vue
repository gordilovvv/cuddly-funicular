<script setup>
import { computed, ref, useAttrs, useCssModule } from 'vue'
import { useI18n } from 'vue-i18n'
import AppPopup from '@/components/popup/AppPopup.vue'
import PortfolioBalance from '@/components/general/balance/PortfolioBalance.vue'
import MenuLink from '@/components/general/MenuLink.vue'
import VIcon from '@/components/common/icon/VIcon.vue'
import { useUserStore } from '@/stores/user'

const styles = useCssModule('styles');
const attrs = useAttrs();
const { t } = useI18n();
const userStore = useUserStore();

const user = ref(null);
const userClasses = computed(() => {
    return [styles.user, styles.button, {
        [styles.active]: isDropdownVisible.value
    }];
});

const avatarStyles = computed(() => {
    return {
        backgroundImage: `url(${ userStore.avatar })`
    }
});

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
}

const verificationClasses = computed(() => {
    return [styles.verification, {
        [styles.green]: userStore.isVerified,
        [styles.orange]: !userStore.isVerified
    }]
});

const verificationText = computed(() => {
    return userStore.isVerified
        ? t('verified')
        : t('notVerified');
});
</script>

<template>
    <button
        ref="user"
        :class="userClasses"
        v-bind="attrs"
        @click="toggleDropdown"
    >
        <div :class="styles.userContent">
            <div
                :class="styles.userAvatar"
                :style="avatarStyles"
            />

            <div :class="styles.userDetails">
                <div :class="styles.userName">
                    {{ userStore.name }}
                </div>
                
                <PortfolioBalance :class="styles.userBalance" />
            </div>
        </div>

        <div :class="styles.userArrow">
            <VIcon name="arrow-down" />
        </div>
    </button>

    <AppPopup
        v-model="isDropdownVisible"
        type="pane"
        :pane-activator="user"
    >
        <div :class="styles.dropdown">
            <div :class="styles.user">
                <div :class="styles.userContent">
                    <div
                        :class="styles.userAvatar"
                        :style="avatarStyles"
                    />

                    <div :class="styles.userDetails">
                        <div :class="styles.userName">
                            {{ userStore.name }}
                        </div>

                        <div :class="verificationClasses">
                            {{ verificationText }}
                        </div>
                    </div>
                </div>
            </div>

            <MenuLink
                to="/verification"
                icon="verification"
                :class="styles.dropdownLink"
            >
                Верификация
            </MenuLink>

            <MenuLink
                to="/history"
                icon="history"
                :class="styles.dropdownLink"
            >
                Транзакции
            </MenuLink>

            <MenuLink
                to="/affiliate"
                icon="affiliate"
                :class="styles.dropdownLink"
            >
                Реферальная программа
            </MenuLink>

            <MenuLink
                to="/logout"
                icon="logout"
                :class="styles.dropdownLogout"
            >
                Выйти
            </MenuLink>
        </div>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './UserPreview.module.scss';
</style>