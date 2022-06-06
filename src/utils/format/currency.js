import { useMainStore } from '@/stores/main'
import { USD_TYPE, EUR_TYPE, RUB_TYPE } from '@/utils/currency'

const OPTIONS = {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}

const numberFormats = {
    [USD_TYPE]: new Intl.NumberFormat('en-US',
        {
            currency: USD_TYPE,
            ...OPTIONS
        }
    ),
    [EUR_TYPE]: new Intl.NumberFormat('en-US',
        {
            currency: EUR_TYPE,
            ...OPTIONS
        }
    ),
    [RUB_TYPE]: new Intl.NumberFormat('ru-RU',
        {
            currency: RUB_TYPE,
            ...OPTIONS
        }
    )
}

export function formatCurrency(value) {
    const mainStore = useMainStore();
    
    const activeCurrency = mainStore.currency;
    
    const formattedCurrency = numberFormats[activeCurrency].format(parseFloat(value));

    if (activeCurrency === RUB_TYPE) {
        return formattedCurrency;
    } else {
        return formattedCurrency.replace(/,/g, ' ');
    }
}

export function decomposeBalanceValue(value) {
    const formatted = formatCurrency(value)
        .replace(/\s/g, '');

    const formatInteger = num => {
        const n = String(num);

        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m) => `${m} `)
    }

    const [
        // eslint-disable-next-line no-unused-vars
        full,
        currency,
        integer,
        separator,
        decimal,
        currencyRepeat
    ] = /([$,€,₽])?([0-9]+)([,.])([0-9]+)?([$,€,₽])?/g.exec(formatted);

    return {
        currency: currency || currencyRepeat,
        integer: formatInteger(integer),
        separator,
        decimal
    };
}