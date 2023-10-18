module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    // files: ["*.ts","*.tsx"],
    "overrides": [
        {
            "files": ["*.ts","*.tsx"],
        }
    ],
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module",
        project: './tsconfig.json',
    },
    plugins: [
        "react",
        "react-hooks",
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    rules: {
        "no-undef":"off",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "react/prop-types":[0],
        "react/no-direct-mutation-state":'off'
    }
};