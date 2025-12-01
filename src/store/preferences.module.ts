import { UserPreferencesModel } from '@/models/user-preferences.model';

const STORAGE_KEY = 'userPreferences';

// Default preferences
const defaultPreferences: UserPreferencesModel = {
  darkMode: false,
  language: 'EN',
  tableDensity: false,
};

// Load from localStorage or use defaults
const loadPreferencesFromStorage = (): UserPreferencesModel => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load preferences from localStorage:', error);
  }
  return defaultPreferences;
};

const initialState = {
  userPreferences: loadPreferencesFromStorage(),
};

export const preferences = {
  namespaced: true,
  state: initialState,
  getters: {
    getUserPreferences: (state: any) => state.userPreferences,
    getDarkMode: (state: any) => state.userPreferences.darkMode,
    getLanguage: (state: any) => state.userPreferences.language,
    getTableDensity: (state: any) => state.userPreferences.tableDensity,
  },
  mutations: {
    SET_PREFERENCES(state: any, preferences: UserPreferencesModel) {
      state.userPreferences = preferences;
    },
    SET_DARK_MODE(state: any, darkMode: boolean) {
      state.userPreferences.darkMode = darkMode;
    },
    SET_LANGUAGE(state: any, language: string) {
      state.userPreferences.language = language;
    },
    SET_TABLE_DENSITY(state: any, tableDensity: boolean) {
      state.userPreferences.tableDensity = tableDensity;
    },
  },
  actions: {
    // Load preferences from localStorage
    loadPreferences({ commit }: any) {
      const preferences = loadPreferencesFromStorage();
      commit('SET_PREFERENCES', preferences);
      return preferences;
    },

    // Save preferences to localStorage
    savePreferences({ state }: any) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userPreferences));
      } catch (error) {
        console.error('Failed to save preferences to localStorage:', error);
      }
    },

    // Update dark mode and persist
    updateDarkMode({ commit, dispatch }: any, darkMode: boolean) {
      commit('SET_DARK_MODE', darkMode);
      dispatch('savePreferences');
    },

    // Update language and persist
    updateLanguage({ commit, dispatch }: any, language: string) {
      commit('SET_LANGUAGE', language);
      dispatch('savePreferences');
    },

    // Update table density and persist
    updateTableDensity({ commit, dispatch }: any, tableDensity: boolean) {
      commit('SET_TABLE_DENSITY', tableDensity);
      dispatch('savePreferences');
    },
  },
};
