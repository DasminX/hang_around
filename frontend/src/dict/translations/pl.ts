export default {
  api_errors: {
    REQUIRED: "Wartość wymagana",
    INVALID_EMAIL: "Nieprawidłowa wartość w polu e-mail.",
    INVALID_PASSWORD_TYPE: "Nieprawidłowy typ danych w polu hasło.",
    WEAK_PASSWORD:
      "Zbyt słabe hasło. Musi składać się z minimum 8 znaków, w tym małych i dużych liter oraz jednej liczby i jednego znaku specjalnego.",
    PASSWORD_NOT_EQUAL: "Hasła nie są takie same.",
    INVALID_LOCATION: "Wprowadzona wartość w polu 'lokalizacja' jest nieprawidłowa.",
    INVALID_TYPES_OF_FOOD: "Jedna z kategorii typu jedzenia jest nieprawidłowa.",
    INVALID_DISTANCE: "Nieprawidłowa wartość odległości.",
    TOO_BIG_DISTANCE: "Wprowadzono zbyt daleki dystans.",
    UNIT_REQUIRED: "Jednostka odległości jest wymagana (m, yd).",
    WRONG_UNIT: "Nieprawidłowa jednostka odległości.",
    INVALID_RATING_TYPE: "Nieprawidłowy typ w polu rating.",
    TOO_SMALL_RATING: "Zbyt mała wartość ratingu (minimum 1).",
    TOO_BIG_RATING: "Zbyt duża wartość ratingu (maksymalnie 5).",
    INVALID_ID_TYPE: "Nieprawidłowy typ danych w polu ID.",
    INVALID_NAME_TYPE: "Nieprawidłowy typ w polu 'nazwa'.",
    TOO_SHORT_NAME: "Nazwa jest zbyt krótka.",
    INVALID_URL: "Nieprawidłowy URL.",
    INVALID_ACCESSIBLE_VALUE: "Nieprawidłowa wartość w polu accessible.",
    BAD_CREDENTIALS: "Wprowadzono nieprawidłowe dane.",
    UNKNOWN_ERROR: "Wystąpił nieznany błąd. Spróbuj ponownie.",
    NOT_FOUND: "Nie znaleziono zasobu.",
    INPUT_VALIDATION_ERROR: "Wprowadzone dane nie są poprawne.",
    EMAIL_NOT_CONFIRMED: "Aby korzystać z konta musisz potwierdzić swój e-mail.",
    NOT_AUTHENTICATED: "Odmowa dostępu.",
    TIMEOUT: "Limit czasu żądania został przekroczony.",
    INTERNAL_ERROR: "Błąd serwera. Spróbuj ponownie.",
    ACCOUNT_ALREADY_EXISTS: "Konto już istnieje dla tego adresu e-mail.",
    TOO_MANY_REQUESTS: "Wykonałeś zbyt dużo zapytań. Spróbuj ponownie później.",
  },
  errors: {
    occured: "Wystąpił błąd",
    unknown: "Nieznany błąd",
  },
  auth: {
    welcomeTo: "Witaj w ",
    loginTo: "Zaloguj się na ",
    email: "Email",
    password: "Hasło",
    repeatPassword: "Powtórz hasło",
    privacyPolicy: "Akceptuje politykę prywatności",
    isNotValid: " jest niepoprawne!",
    enterValid: "Proszę wprowadzić poprawną wartość.",
    notHavingAccount: "Jeszcze nie posiadasz konta?",
    havingAccount: "Posiadasz już konto?",
    login: "Zaloguj się",
    register: "Zarejestruj się",
    emailInvalid: "Email jest nieprawidłowy",
    passwordInvalid: "Hasło jest nieprawidłowe",
    repeatPasswordInvalid: "Hasła nie są takie same",
    privacyPolicyInvalid: "Polityka prywatności nie została zaakceptowana",
    emailVerificationInvalid: "Email nie został zweryfikowany",
    remindPassword: "Przypomnij hasło",
    changeForgottenPassword: "Zmień hasło",
    forgotPassword: "Nie pamiętasz hasła?",
  },
  dashboard: {
    search: "Wyszukaj miejsce...",
    notFound: "Nie znaleziono żadnych miejsc",
    findPlace: "Znajdź miejsce",
    distance: "Odległość",
    coords: "Wprowadź koordynaty",
    lat: "Latitude",
    lng: "Longitude",
    minRating: "Minimalna ocena (1-5)",
    typeOfFood: "Typ jedzenia",
    foundPlaces: "Wyszukane miejsca:",
    settings: "Ustawienia",
    visits: "Wizyty",
  },
  place: {
    accessible: "Posiada udogodnienia dla osób niepełnosprawnych",
    notAccessible: "Nie posiada udogodnień dla osób niepełnosprawnych",
    visit: "Odwiedź",
    wannaVisit:
      "Czy na pewno chcesz odwiedzić to miejse? Potwierdzenie przenosi do lokalizacji miejsca w aplikacji Google Maps.",
    rating: "Ocena",
    localisationRequired: "Lokalizacja musi być włączona, aby wybrać miejsce na mapie",
    enterLocalisationManually: "Wpisz ręcznie",
    chooseOnMap: "Wybierz na mapie",
  },
  common: {
    close: "Zamknij",
    clickHere: "Kliknij tutaj",
    send: "Wyślij",
    search: "Szukaj",
    select: "Wybierz",
    goBack: "Wróć",
    warning: "Ostrzeżenie",
    cancel: "Anuluj",
  },
  types_of_food: {
    american_restaurant: "Amerykańska",
    bakery: "Piekarnia",
    bar: "Bar",
    barbecue_restaurant: "Grill",
    brazilian_restaurant: "Brazylijska",
    breakfast_restaurant: "Śniadania",
    brunch_restaurant: "Brunch",
    cafe: "Kawiarnia",
    chinese_restaurant: "Chińska",
    coffee_shop: "Kawiarnia",
    fast_food_restaurant: "Fast food",
    french_restaurant: "Francuska",
    greek_restaurant: "Grecka",
    hamburger_restaurant: "Hamburgery",
    ice_cream_shop: "Lody",
    indian_restaurant: "Indyjska",
    indonesian_restaurant: "Indonezyjska",
    italian_restaurant: "Włoska",
    japanese_restaurant: "Japońska",
    korean_restaurant: "Koreańska",
    lebanese_restaurant: "Libańska",
    meal_delivery: "Dostawa",
    meal_takeaway: "Na wynos",
    mediterranean_restaurant: "Śródziemnomorska",
    mexican_restaurant: "Meksykańska",
    middle_eastern_restaurant: "Bliskowschodnia",
    pizza_restaurant: "Pizza",
    ramen_restaurant: "Ramen",
    restaurant: "Restauracja",
    sandwich_shop: "Kanapki",
    seafood_restaurant: "Owoce morza",
    spanish_restaurant: "Hiszpańska",
    steak_house: "Steki",
    sushi_restaurant: "Sushi",
    thai_restaurant: "Tajska",
    turkish_restaurant: "Turecka",
    vegan_restaurant: "Wegańska",
    vegetarian_restaurant: "Wegetariańska",
    vietnamese_restaurant: "Wietnamska",
  },
  settings: {
    change_lang: "Zmień język",
    logout: "Wyloguj się",
  },
};
