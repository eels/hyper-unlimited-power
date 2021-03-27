module.exports = {
  "extends": [
    "eslint:recommended",
    "standard",
    "semistandard",
    "standard-react",
  ],

  "plugins": [
    "react",
    "sort-destructure-keys",
    "sort-keys-fix"
  ],

  "settings": {
    "react": {
      "version": "latest"
    }
  },

  "rules": {
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "newline-before-return": [
      "error"
    ],
    "newline-after-var": [
      "error",
      "always"
    ],
    "no-console": [
      "error"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1,
        "maxBOF": 0
      }
    ],
    "no-undef": [
      "error"
    ],
    "one-var": [
      "error",
      "never"
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "never",
        "next": "import",
        "prev": "import"
      }
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "quote-props": [
      "error",
      "consistent"
    ],
    "yoda": [
      "error",
      "always"
    ],

    "react/sort-comp": [
      "error",
      {
        "order": [
          "static-methods",
          "lifecycle",
          "getters",
          "setters",
          "method-handlers",
          "method-getters",
          "method-setters",
          "everything-else",
          "rendering"
        ],
        "groups": {
          "method-getters": [
            "/^get.+$/"
          ],
          "method-handlers": [
            "/^handle.+$/"
          ],
          "method-setters": [
            "/^set.+$/"
          ],
          "rendering": [
            "/^render.+$/",
            "render"
          ],
        }
      }
    ],
    "react/sort-prop-types": [
      "error",
      {
        "ignoreCase": false,
        "callbacksLast": false,
        "noSortAlphabetically": false,
        "requiredFirst": false,
        "sortShapeProp": true
      }
    ],

    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      {
        "caseSensitive": true
      }
    ],

    "sort-keys-fix/sort-keys-fix": [
      "error"
    ]
  }
};
