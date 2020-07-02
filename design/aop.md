# AOP and The Onion Model

## AOP

AOP (Aspect-Oriented Programming) addresses the problem of cross-cutting concerns, which would be any kind of code that is repeated in different methods and can't normally be completely refactored into its own module, like with logging or verification. So, with AOP you can leave that stuff out of the main code and define it vertically.

## Onion Model

The onion model is a graph-based diagram and conceptual model for describing relationships among levels of a hierarchy, evoking a metaphor of the layered "shells" exposed when an onion (or other concentric assembly of spheroidal objects) is bisected by a plane that intersects the center or the innermost shell.

The outer layers in the model typically add size and/or complexity, incrementally, around the inner layers they enclose.

In Koa, it uses multiple layers to process a request as below:

<img src="../assets/onion_model.png" width="400"/>

## Example: The Onion Model of NestJS

It is like the diagram as below:

<img src="../assets/nestjs_aop.png" width="400"/>

The controller is the core module of this onion model, including `Module`, `Service`, `Controller` and so on.

Before accessing the controller, the request will be processed by various middleware, and after leaving controller, it will also be processed by interceptors.

## Reference

- <https://docs.nestjs.com/faq/request-lifecycle>
