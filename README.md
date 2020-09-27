<h1 align="center">strict-routes</h1>
<p align="center"><em>zero-cost strictly typed routing in TypeScript</em></p>

---

Have you ever broken a link in your app with a stupid typo or by overlooking? No more.

### Usage

```ts
import { strictRoutes } from 'strict-routes';

type Routes =
  | '/'
  | 'posts/{postId}'
  | 'posts/{postId:number}/{commentId:string}'

const { navigate } = strictRoutes<Routes>()({
  navigate: 
})

navigate({ path: 'posts/{postId}', postId: 1 });
```

### Installation

```
yarn add strict-routes
npm install strict-routes
```

### TypeScript Version

Because `strict-routes` is using [template literal types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) it works with TypeScript 4.1 or newer.
