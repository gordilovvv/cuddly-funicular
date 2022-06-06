<script setup>
import { useCssModule } from 'vue'
import { useI18n } from 'vue-i18n'
import MenuLink from '@/components/general/MenuLink.vue'
import UserPreview from '@/components/user/preview/UserPreview.vue'
import TheSidebarPromo from '@/components/general/sidebar/TheSidebarPromo.vue'
import Logo from '@icons/logo.svg'
import { visible as isPromoVisible, hide as hidePromo } from '@/services/cryptoCardPromo'

const { t } = useI18n();

const styles = useCssModule('styles');
</script>

<template>
    <div :class="styles.sidebar">

        <div :class="styles.logo">
            <Logo />
        </div>
    
        <UserPreview :class="styles.user" />

        <div>
            <MenuLink
                to="/"
                icon="house"
            >
                {{ t('house') }}
            </MenuLink>

            <MenuLink
                to="/swap"
                icon="swap"
            >
                {{ t('swap') }}
            </MenuLink>

            <MenuLink
                to="/deposit"
                icon="deposit"
            >
                {{ t('deposit') }}
            </MenuLink>

            <MenuLink
                to="/withdrawal"
                icon="withdrawal"
            >
                {{ t('withdrawal') }}
            </MenuLink>
        </div>

        <TheSidebarPromo
            v-if="isPromoVisible"
            @hide="hidePromo()"
        />

    </div>
</template>

<style lang="scss" module="styles">
@import './TheSidebar.module.scss';
</style>