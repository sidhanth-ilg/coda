# sidhanth-coda

Submission of task for Coda.

Features Done:

1. Scroll view for the products
2. Edit a product
3. Delete a product
4. Add a product with reasonable validations for the form.
5. Display the product detail page
6. Copy voucher code in product detail page
7. A button to navigate to a paginatd UI for the products list
8. Test cases for the flow in Cypress e2e (`npm run test:e2e:dev`)
9. Common components for button and input
10. Typescript used for type safety
11. Responsive for mobile screen and desktop

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
