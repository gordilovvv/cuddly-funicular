import { onMounted, onUnmounted } from 'vue'

export const DIALOG_TYPE = 'dialog';
export const PANE_TYPE = 'pane';

export const BREAKPOINT = 1025;

export function usePopupEscClose(callback) {
    const fn = event => {
        event.key === 'Escape' && callback();
    }

    const add = () => {
        window.addEventListener('keydown', fn);
    }

    const remove = () => {
        window.removeEventListener('keydown', fn);
    }

    onMounted(add)

    onUnmounted(remove);
}