# Алгоритм сортировки подсчётом (Counting sort)

---
[Интерактивный пример работы алгоритма](https://array-counting-sort.herokuapp.com/)

---

## Демонстрация работы алгоритма

Представим, что данные, которые нужно отсортировать, находятся в пределах от `0` до `9`.

![1](/assets/1.png)  
*Массив из шести элементов*

Для данного алгоритма потребуется создать массив для подсчёта каждого уникального объекта. Изначально он заполнен нулями.

![2](/assets/2.png)  
*Длина массива совпадает с максимально возможным числом, в нашем случае от `0` до `9`*

Далее требуется подсчитать каждый элемент входного массива и записать результат в соответствующий индекс массива для подсчёта.
К примеру в нашем массиве три двойки, значит в индексе `2` в итоге будет число `3`.

![3](/assets/3.gif)  
*Ведём подсчёт элементов по индексу равному значению элемента*

Теперь, в массиве для подсчёта, прибавляем к каждому элементу значение предыдущего элемента.

![4](/assets/4.gif)

Создаём массив для записи в него элементов в отсортированном порядке и проходимся по всему входному
массиву. Размещаем элементы в правильные позиции, которые записаны в массиве для подсчёта, попутно уменьшая
значение в нём на единицу.

![5](/assets/5.gif)  
*Массив отсортирован*

---

##Сложность алгоритма
`O(n+k)` где `n` количество элементов во входном массиве, и `k` диапазон значений.

>Применение сортировки подсчётом целесообразно лишь тогда, когда сортируемые числа имеют (или их можно отобразить в) диапазон возможных значений,
который достаточно мал по сравнению с сортируемым множеством, например, миллион натуральных чисел меньших 1000.


---

## Пример реализации на JavaScript

```javascript
const countingSort = (array) => {
  
  /** Находим минимальное, максимальное значение */
  const minValue = Math.min(...array)
  const maxValue = Math.max(...array)
  
  /** Вычисляем диапазон значений */
  const range = maxValue - minValue + 1

  /** Создаём массив для подсчёта, размером равным диапазону значений, и заполненяем его нулями */
  const countingArray = Array.from({length: range}).map(_ => 0)
  
  /** Создаём массив для записи отсортированных значений */
  const resultArray = Array.from({length: array.length}).map(_ => 0)

  /** Записываем количество каждого значения в массив для подсчёта */
  for (let i = 0; i < array.length; ++i) {
    countingArray[array[i] - minValue] += 1
  }

  /** Суммируем каждый элемент с предыдущим */
  for (let i = 1; i < countingArray.length; ++i) {
    countingArray[i] += countingArray[i - 1]
  }
  
  /** Записываем отсортированные значения в результирующий массив, уменьшая счётчик на единицу */
  for (let i = array.length - 1; i > -1; --i) {
    resultArray[countingArray[array[i] - minValue] - 1] = array[i]
    countingArray[array[i] - minValue] -= 1
  }

  return resultArray
}
```
*Данная реализация учитывает отрицательные числа*