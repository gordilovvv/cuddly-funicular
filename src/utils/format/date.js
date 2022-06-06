import { useI18n } from 'vue-i18n'

let dateFormats;

const MS_IN_SECOND = 1000;

// TODO:
// Если язык обновляется с перезагрузкой, то все ок
// Если нет - пофиксить
function setupDateFormat() {
    const { locale } = useI18n();

    return {
        time: new Intl.DateTimeFormat(
            locale.value,
            {
                minute: '2-digit',
                hour: '2-digit'
            }
        ),
        beautifulDate: new Intl.DateTimeFormat(
            locale.value,
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        )
    }
}

function format(ts, type) {
    if (!dateFormats) {
        dateFormats = setupDateFormat();
    }

    const date = new Date(ts * MS_IN_SECOND);
    const formatter = dateFormats[type];

    return formatter.format(date);
}

export function formatTsToBeautifulDate(timestamp) {
    return format(timestamp, 'beautifulDate');
}

export function formatTsToTime(timestamp) {
    return format(timestamp, 'time');
}