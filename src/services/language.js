export const AVAILABLE_LOCALES = [
    {
        id: 'ru',
        name: 'Русский',
        image: '/images/locales/ru.png'
    },
    {
        id: 'en',
        name: 'English',
        image: '/images/locales/en.png'
    }
]

const LANGUAGE_LS_TYPE = 'language';

function saveLanguageToLs(locale) {
    localStorage.setItem(LANGUAGE_LS_TYPE, locale);
}

function getLanguageFromLs() {
    return localStorage.getItem(LANGUAGE_LS_TYPE);
}

export function updateLanguage(activeLocale, newLocale) {
    activeLocale.value = newLocale;

    saveLanguageToLs(newLocale);
}

export function getActiveLanguage(activeLocale) {
    return AVAILABLE_LOCALES.find(
        ({ id }) => id === activeLocale
    );
}

export function getInitialLanguage() {
    const locale = getLanguageFromLs();

    return locale ?? AVAILABLE_LOCALES[0].id;
}