# Vue Life Cycle

## Life Cycle Hooks

There is an image from official website of Vue.

<img src="../assets/vue_lifecycle.png" width="400" />

## Parent and Children

When a Vue component is instantiated with a child component, their life cycle hooks' sequence is as below:

1. parent `created`
2. child `created`
3. child `mounted`
4. parent `mounted`
5. parent `beforeUpdate`
6. child `beforeUpdate`
7. child `updated`
8. parent `updated`
9. child `destroyed`
10. parent `destroyed`

Vue has to create the parent object, after that, to create the child object. 

In contrast, after the child component is rendered, we can say a parent component's rendering is finished, destroying a component is like the same.

## $nextTick

