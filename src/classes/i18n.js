class I18N {
  // The default locale
  default = 'en'
  // Localizations
  localizations = {
    fr: {
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      prompt_image: 'URL de l\'image ?',
    },
    en: {
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      prompt_image: 'Image URL?',
    },
  }
  // Current locale
  _ = {}

  constructor (props) {
    this.locale = this.default
    this.detectLocale()
  }

  detectLocale () {
    let locale = document.querySelector('[lang]').getAttribute('lang')
    this.setLocale(locale)
  }

  setLocale (locale) {
    if (locale && this.localizations.hasOwnProperty(locale)) {
      this.locale = locale
      this._ = this.localizations[locale]
    }
  }
}

export const i18n = new I18N()
