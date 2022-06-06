<script setup>
import { useCssModule } from 'vue'
import AppContainer from '@/components/AppContainer.vue'
import TheHeader from '@/components/general/header/TheHeader.vue'
import TheSidebar from '@/components/general/sidebar/TheSidebar.vue'
import VerificationAlert from '@/components/general/verification/VerificationAlert.vue'
import { useUserStore } from '@/stores/user'

const styles = useCssModule('styles');

const userStore = useUserStore();
</script>

<template>
    <div :class="styles.wrapper">
        <div :class="styles.container">
            
            <TheHeader />
            
            <TheSidebar />
            
            <AppContainer>
                <VerificationAlert v-if="!userStore.isVerified" />
                
                <slot />
            </AppContainer>
            
        </div>
    </div>
</template>

<style module="styles">
@import '@/layouts/DefaultLayout.module.scss';
</style>