<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, useCssModule } from 'vue'
import { BREAKPOINT } from '@/utils/popup'

const styles = useCssModule('styles');

const props = defineProps({
    pane: Boolean,
    visible: Boolean,
    paneActivator: HTMLElement
});

const emit = defineEmits({
    hide: null
});

const isPaneLeft = ref(false);

const paneBoundingBoxPosition = reactive({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const boxStyles = computed(() => {
    const { top, left, right, bottom } = paneBoundingBoxPosition;

    return {
        top: `${ top }px`,
        left: `${ left }px`,
        right: `${ right }px`,
        bottom: `${ bottom }px`
    }
});

const boxClasses = computed(() => {
    return props.pane ?
        [
            styles.box,
            {
                [styles.contentLeft]: isPaneLeft.value,
                [styles.contentRight]: !isPaneLeft.value
            }
        ]
        : [ styles.box ];
})

const contentStyles = computed(() => {
    if (!props.pane)
        return null;

    return isPaneLeft.value
        ? { transformOrigin: 'top left' }
        : { transformOrigin: 'top right' };
});

const updatePaneBoundingBox = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= BREAKPOINT) {
        paneBoundingBoxPosition.top = paneBoundingBoxPosition.left = paneBoundingBoxPosition.right = paneBoundingBoxPosition.bottom = 0;

        return;
    }

    const activator = props.paneActivator.getBoundingClientRect();
    
    const top = activator.top + activator.height;
    const left = activator.left;
    const right = window.innerWidth - (activator.left + activator.width);
    const bottom = 0;

    const isLeftPosition = left < right;

    paneBoundingBoxPosition.top = top;
    paneBoundingBoxPosition.bottom = bottom;

    if (isLeftPosition) {
        paneBoundingBoxPosition.left = left;
        paneBoundingBoxPosition.right = 0;
    } else {
        paneBoundingBoxPosition.left = 0;
        paneBoundingBoxPosition.right = right;
    }

    isPaneLeft.value = isLeftPosition;
}

onMounted(() => {
    if (props.pane) {
        updatePaneBoundingBox();

        window.addEventListener('scroll', updatePaneBoundingBox, { passive: true });
        window.addEventListener('resize', updatePaneBoundingBox, { passive: true });
    }
})

onBeforeUnmount(() => {
    if (props.pane) {
        window.removeEventListener('scroll', updatePaneBoundingBox, { passive: true });
        window.removeEventListener('resize', updatePaneBoundingBox, { passive: true });
    }
})
</script>

<template>
    <div :class="styles.wrap">

        <Transition name="overlay-appear">
            <div
                v-if="visible"
                :class="styles.overlay"
                @click="emit('hide')"
            />
        </Transition>

        <div
            :style="boxStyles"
            :class="boxClasses"
        >
            <slot :content-styles="contentStyles" />
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupWrap.scss';
</style>

<style lang="scss">
.overlay-appear-enter {
    &-from {
        opacity: 0;
    }

    &-to {
        opacity: 1;
    }

    &-active {
        transition: opacity 0.2s linear;
    }
}

.overlay-appear-leave {
    &-from {
        opacity: 1;
    }

    &-to {
        opacity: 0;
    }

    &-active {
        transition: opacity 0.2s linear;
    }
}
</style>