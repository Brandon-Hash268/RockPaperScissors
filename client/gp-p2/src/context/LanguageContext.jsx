import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const LanguageContext = createContext();

const texts = {
  en: {
    title: "Login to play",
    placeholder: "Enter your username",
    button: "Login",
    description: "Rock Paper Scissors",
  },
  jp: {
    title: "ログインしてプレイ",
    placeholder: "ユーザー名を入力",
    button: "ログイン",
    description: "じゃんけん",
  },
  fr: {
    title: "Connectez-vous pour jouer",
    placeholder: "Entrez votre nom d'utilisateur",
    button: "Se connecter",
    description: "Pierre Papier Ciseaux",
  },
  ar: {
    title: "قم بتسجيل الدخول للعب",
    placeholder: "أدخل اسم المستخدم",
    button: "تسجيل الدخول",
    description: "حجر ورقة مقص",
  },
  id: {
    title: "Masuk untuk bermain",
    placeholder: "Masukkan nama pengguna",
    button: "Masuk",
    description: "Batu Gunting Kertas",
  },
  jv: {
    title: "Melebu kanggo dolanan",
    placeholder: "Lebokke Jeneng Pelakon",
    button: "Melebu",
    description: "Batu Gunting Kertas",
  }
};

export const LanguageProvider = ({ children }) => {
  const savedLanguage = localStorage.getItem('language') || 'en'; 
  const [language, setLanguage] = useState(savedLanguage); 

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => useContext(LanguageContext);
