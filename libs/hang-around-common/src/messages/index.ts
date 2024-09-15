export enum AuthValidationErrors {
  INVALID_EMAIL = "INVALID_EMAIL",

  INVALID_PASSWORD_TYPE = "INVALID_PASSWORD_TYPE",
  WEAK_PASSWORD = "WEAK_PASSWORD",
  PASSWORD_NOT_EQUAL = "PASSWORD_NOT_EQUAL",
}

export enum PlacesValidationErrors {
  INVALID_TYPES_OF_FOOD = "INVALID_TYPES_OF_FOOD",

  INVALID_DISTANCE = "INVALID_DISTANCE",
  TOO_BIG_DISTANCE = "TOO_BIG_DISTANCE",
  UNIT_REQUIRED = "UNIT_REQUIRED",
  WRONG_UNIT = "WRONG_UNIT",
}

export enum VisitsValidationErrors {
  INVALID_ID_TYPE = "INVALID_ID_TYPE",

  INVALID_NAME_TYPE = "INVALID_NAME_TYPE",
  TOO_SHORT_NAME = "TOO_SHORT_NAME",

  INVALID_URL = "INVALID_URL",
  INVALID_ACCESSIBLE_VALUE = "INVALID_ACCESSIBLE_VALUE",
}

export enum CommonValidationErrors {
  INVALID_LOCATION = "INVALID_LOCATION",
  INVALID_RATING_TYPE = "INVALID_RATING_TYPE",
  TOO_SMALL_RATING = "TOO_SMALL_RATING",
  TOO_BIG_RATING = "TOO_BIG_RATING",
}