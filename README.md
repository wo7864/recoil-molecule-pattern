# recoil-molecule-pattern

### 개발 동기

Recoil은 아래 예시로 1개 변수를 생성합니다.

```jsx
const todoListState = atom({
  key: 'todoListState',
  default: [],
});
```

전역에서 관리해야 하는 상태가 늘어 갈 수록, 이 최소 4줄씩 필요한 이 선언은 동일하게 반복되어야 합니다.

이 변수를 사용 할 때는 아래 예시를 사용합니다.

```jsx
const todoList = useRecoilValue(todoListState);
```

한 컴포넌트에서 여러 변수를 사용하면 아래와 같이 사용해야 합니다.

```jsx
const todoList1 = useRecoilValue(todoListState1);
const todoList2 = useRecoilValue(todoListState2);
const todoList3 = useRecoilValue(todoListState3);
const todoList4 = useRecoilValue(todoListState4);
```

불필요하게 긴 선언이 많다고 생각했습니다. 아래와 같이 사용 할 수 있다면 더 좋지않을까요?

```jsx
const { todoList1, todoList2, todoList3, todoList4 } = useRecoilValue(...);
```

---

### 사용 방법

전역 변수의 생성은 아래와 같습니다.

```jsx
const initialValue = {
    todoList: [],
    isOpen: False,
}

const todoAtomSet = makeAtomSet("todo-state", initialValue)
const todoProvider = toMolecule(todoAtomSet)

```

사용은 아래와 같습니다.

```jsx
const { todoList, isOpen } = useRecoilValue(_ => _.todoState([]));
```

상태의 관심사에 따라 효율적으로 분할하고 사용 할 수 있습니다.
