export const VALID_EMAIL = "test@email.com";
export const INVALID_EMAIL = "not-email";
export const VALID_PASSWORD = "Test123!";
export const INVALID_PASSWORD = "aaa";

export const VALID_SIGN_UP_CREDENTIALS = {
  email: VALID_EMAIL,
  password: VALID_PASSWORD,
  repeatPassword: VALID_PASSWORD,
};

export const VALID_SIGN_IN_CREDENTIALS = {
  email: VALID_EMAIL,
  password: VALID_PASSWORD,
};

export const VALID_FIND_PLACES_REQUEST = {
  location: {
    lat: 40.7128,
    lng: -74.006,
  },
  typesOfFood: ["pizza", "kebab"],
  howFar: {
    distance: 10,
    unit: "m",
  },
  minRating: 4.5,
};

export const INVALID_FIND_PLACES_REQUEST = {
  typesOfFood: ["Italian", "Mexican"],
  howFar: { distance: 10, unit: "m" },
  location: "invalid-location-format",

  minRating: "high",
};
