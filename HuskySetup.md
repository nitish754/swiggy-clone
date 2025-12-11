# 🚀 Node.js + TypeScript + ESLint + Prettier + Husky + TypeCheck Setup

A complete guide to setting up a clean, professional backend development workflow with:

* **TypeScript**
* **ESLint** (with `@typescript-eslint`)
* **Prettier**
* **Type Checking (`tsc --noEmit`)**
* **Husky + Lint-Staged**
* **VSCode Auto-formatting**

This ensures:
✔ consistent code style
✔ zero lint errors
✔ zero TypeScript type errors
✔ safe commits (pre-commit validation)

---

# 📁 Project Structure (Recommended)

```
project-root/
├── src/
├── dist/
├── node_modules/
├── tsconfig.json
├── package.json
├── .eslintrc.cjs  (or js)
├── .prettierrc
└── .husky/
```

---

# 📦 1. Install Dependencies

### **ESLint + TS + Prettier**

```bash
npm install -D \
  typescript \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint \
  eslint-plugin-prettier \
  eslint-config-prettier \
  prettier
```

### **Husky + Lint-Staged**

```bash
npm install -D husky lint-staged
```

---

# 🛠 2. Initialize TypeScript

```bash
npx tsc --init
```

Recommended changes in **tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

# 🧹 3. Create Prettier Config

Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
```

---

# 🔍 4. Create ESLint Config

Use `.eslintrc.js` or `.eslintrc.cjs`:

```js
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const prettier = require('eslint-plugin-prettier')
const globals = require('globals')

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },

  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },

    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs['recommended-requiring-type-checking'].rules,

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      'prettier/prettier': 'error'
    },
  },
]
```

---

# ✔ 5. Add NPM Scripts

In **package.json**:

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "format": "prettier --write .",
    "prepare": "husky install"
  }
}
```

---

# 🪝 6. Setup Husky (Pre-Commit Hook)

### 1. Install Husky

```bash
npm run prepare
```

### 2. Add lint-staged config to package.json

```json
{
  "lint-staged": {
    "*.ts": ["eslint --fix", "prettier --write"]
  }
}
```

### 3. Add a pre-commit hook

```bash
npx husky add .husky/pre-commit "npm run typecheck && npx lint-staged"
```

This runs:
✔ TypeScript type-check
✔ ESLint fix
✔ Prettier fix
✔ Rejects commit if errors exist

---

# 🖥 7. VSCode Setup (Recommended)

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript"]
}
```

---

# ⚡ Usage

### **Run Dev**

```bash
npm run dev
```

### **Run Type Check Only**

```bash
npm run typecheck
```

### **Run Lint**

```bash
npm run lint
```

### **Auto-fix Lint**

```bash
npm run lint:fix
```

### **Prettier Format**

```bash
npm run format
```

---

# 🎉 You Are Ready!

This setup gives you:

* Strong TypeScript rules
* Auto-formatting
* No bad commits
* Clean & consistent codebase

If you want, I can also generate:
✅ Folder structure template
✅ Sample Express app using this setup
✅ Docker setup
✅ Sequelize/Prisma integration

Just tell me!
