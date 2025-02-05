import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./resources/en.json";
import vi from "./resources/vi.json";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};
i18n
  .use(Backend) // Optional, nếu bạn muốn tải các ngôn ngữ từ server
  .use(LanguageDetector) // Optional, nếu bạn muốn phát hiện ngôn ngữ của người dùng
  .use(initReactI18next) // Kết nối i18next với react-i18next
  .init({
    lng: localStorage.getItem("language") || "vi", // Ngôn ngữ mặc định
    fallbackLng: "vi", // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ nào khác
    debug: true, // Bật chế độ debug
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
