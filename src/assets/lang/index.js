/** @format */

import I18n from "react-native-i18n";
import store from "@/store/store";
import enLocale from "./en";
import zhLocale from "./zh";

const messages = {
  zh: {
    ...zhLocale
  },
  en: {
    ...enLocale
  }
};

I18n.fallbacks = true;
I18n.translations = messages;
// console.log("store", store);
// let res = store.getState().search.language;
// if (res) {
//   I18n.locale = res;
// }
export default I18n;
