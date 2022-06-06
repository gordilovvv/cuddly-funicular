import { defineAsyncComponent } from 'vue'

export async function loadLayoutMiddleware(route) {
    const { layout } = route.meta;
    const layoutName = layout || 'default';

    const componentName = `${ layoutName.substr(0, 1).toUpperCase() + layoutName.substr(1, layoutName.length) }Layout`;
    const componentInstance = defineAsyncComponent(() => import(`../../layouts/${ componentName }.vue`));

    route.meta.layoutComponent = componentInstance;
}
