module.exports = {
    //"extends": "airbnb"
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "jest": true
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "defaultParams": true
      }
    },
    "rules": {
      "react/jsx-filename-extension": 0,
      "react/sort-comp": 0,
      "linebreak-style": 0
    }
};
