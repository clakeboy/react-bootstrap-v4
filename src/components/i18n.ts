/**
 * Get navigator language
 * @returns {{name: string, short: string}}
 */
let defLang:any = undefined
export const i18n = {
    getLang:function(){
        if (defLang) {
            return defLang
        }
        const lang = navigator.language;//常规浏览器语言和IE浏览器
        const short_lang = lang.substring(0, 2);//截取lang前2位字
        return {
            name:lang,
            short:short_lang
        };
    },
    setLang:function(lang:string){
        defLang = {
            short:lang,
            name:lang
        }
    }
};

export default i18n;