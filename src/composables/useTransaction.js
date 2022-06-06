import { computed, unref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useTransactionType(type) {
    const { t } = useI18n();
    const nonReactiveType = unref(type);

    const getTypeName = type => {
        switch (type) {
        case 'deposit':
            return t('receive');
        case 'withdrawal':
            return t('withdrawal');
        case 'swap':
            return t('swap');
    
        default:
            console.warn('unknown tx type!');

            return '';
        }
    }

    const typeName = computed(() => {
        return getTypeName(nonReactiveType);
    });

    return {
        typeName
    };
}