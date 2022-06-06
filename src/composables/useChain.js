import { computed } from 'vue'
import { useChainsStore } from '@/stores/chains'

export function useChain(chainId) {
    const chainsStore = useChainsStore();

    const chain = computed(() => {
        const result = chainsStore.chains.find(
            chain => chain.id === chainId.value
        );

        return result ?? {};
    });

    return { chain };
}