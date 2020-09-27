// run this in ts-node or Quokka to "run tests"

import { strictRoutes, StrictRoutes } from "..";

type Routes =
  | "/"
  | "posts/{postId}"
  | "posts/{postId:number}/{commentId:string}";

type _X = StrictRoutes.RoutesWithValues<Routes>;
type _X1 = StrictRoutes.RouteWithValues<"posts/{postId}">;
type _X2 = StrictRoutes.RouteWithValues<"posts/{postId:number}">;
type _X3 = StrictRoutes.RouteWithValues<
  "posts/{postId:number}/{commentId:string}"
>;

const { navigate } = strictRoutes<Routes>()({
  navigate: (route) => {
    console.log(route);
  },
});

// these should fail

// @ts-expect-error
navigate("posts/{postId}");
// @ts-expect-error
navigate({ path: "posts/{postId}" });
navigate({
  path: "posts/{postId:number}/{commentId:string}",
  postId: 20,
  // @ts-expect-error
  commentId: 10,
});

// these should pass

navigate("/");
navigate({ path: "posts/{postId}", postId: "34" }); // string | number
navigate({
  path: "posts/{postId:number}/{commentId:string}",
  postId: 20,
  commentId: "abcd",
});
