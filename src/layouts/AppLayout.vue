<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
    <Component :is="route.meta.layoutComponent">

        <slot />

    </Component>
</template>