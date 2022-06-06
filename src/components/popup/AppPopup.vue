<script setup>
import { computed, toRef, useCssModule, provide } from 'vue'
import AppPopupWrap from './wrap/AppPopupWrap.vue'
import { DIALOG_TYPE, PANE_TYPE, usePopupEscClose } from '@/utils/popup'

const styles = useCssModule('styles');

const props = defineProps({
    type: {
        type: String,
        default: DIALOG_TYPE,
        validator(type) {
            return [DIALOG_TYPE, PANE_TYPE].includes(type)
        }
    },
    modelValue: Boolean,
    paneActivator: HTMLElement 
});

const emit = defineEmits({
    'update:modelValue': null
});

const isOpen = toRef(props, 'modelValue');

const isDialog = computed(() => {
    return props.type === DIALOG_TYPE;
});

const contentClasses = computed(() => {
    return [styles.content, {
        [styles.dialog]: props.isDialog,
        [styles.pane]: !props.isDialog
    }];
});

const contentTransition = computed(() => {
    return isDialog.value
        ? 'dialog-appear'
        : 'pane-appear';
});

const close = () => {
    emit('update:modelValue', false);
}

usePopupEscClose(close);

provide('close', close);
</script>

<template>
    <AppPopupWrap
        v-if="isOpen"
        v-slot="{ contentStyles }"
        :pane="!isDialog"
        :visible="isOpen"
        :pane-activator="paneActivator"
        @hide="close"
    >

        <Transition
            :name="contentTransition"
            appear
            @after-leave="close"
        >
            <div
                v-if="modelValue"
                :class="contentClasses"
                :style="contentStyles"
            >
                <div :class="styles.contentWrap">
                
                    <slot />
                    
                </div>
            </div>
        </Transition>

    </AppPopupWrap>
</template>

<style lang="scss" module="styles">
@import './AppPopup.module.scss';
</style>

<style lang="scss">
.pane-appear-enter {
    &-from {
        opacity: 0;
        transform: scale(0.62);
    }

    &-to {
        opacity: 1;
        transform: scale(1);
    }

    &-active {
        transform-origin: top left;
        transition: opacity 0.1s linear, transform 0.12s linear;
    }
}
</style>