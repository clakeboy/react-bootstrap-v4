/**
 * Get navigator language
 * @returns {{name: string, short: string}}
 */
export const i18n = {
    getLang:function(){
        const lang = navigator.language;//常规浏览器语言和IE浏览器
        const short_lang = lang.substring(0, 2);//截取lang前2位字
        return {
            name:lang,
            short:short_lang
        };
    },
};

export default i18n;