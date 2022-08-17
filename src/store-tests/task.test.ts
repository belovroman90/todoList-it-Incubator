import {
    DIV,
    division, getBanknoteList,
    getSum,
    getTriangleType, isEvenIndexSumGreater, isSquareGreater,
    multiple,
    reducerSalary,
    SUB,
    subtraction,
    SUM,
    sum,
    sumNew
} from "./tasks";

let salary: number,
    add: number,
    sub: number,
    div: number,
    mul: number

beforeEach(() => {
    salary = 700
    add = 500
    sub = 300
    div = 2
    mul = 2
})

test('check sum function', () => {
    const result = sum(salary, add)
    expect(result).toBe(1200)
})
test('subtraction should be correct', () => {
    const result = subtraction(salary, sub)
    expect(result).toBe(400)
})
test('division should be correct', () => {
    const result = division(salary, div)
    expect(result).toBe(350)
    expect(division(0, div)).toBe(0)
})
test('multiple should be correct', () => {
    const result = multiple(salary, mul)
    expect(result).toBe(1400)
    expect(multiple(salary, -1.5)).toBe(-1050)
})
test('reducerSalary should correct return sum', () => {
    expect(reducerSalary(salary, {type: "SUM", n: add})).toBe(1200)
})
test('reducerSalary should correct return result of subtraction', () => {
    expect(reducerSalary(salary, {type: SUB, n: sub})).toBe(400)
})
test('reducerSalary should return correct division value', () => {
    expect(reducerSalary(salary, {type: DIV, n: div})).toBe(350)
})
test('reducerSalary should return good stuff of multiple', () => {
    expect(reducerSalary(salary, {type: "MUL", n: mul})).toBe(1400)
})

test('get sumNew', () => {
    expect(sumNew(3, 5, 7, 6, 4, 9)).toBe(34)
    expect(sumNew(1, 1, 1, 6)).toBe(9)
    expect(sumNew(0)).toBe(0)
})

test('get Triangle Type', () => {
    expect(getTriangleType(1, 1, 1)).toBe('10')
    expect(getTriangleType(2, 3, 3)).toBe('01')
    expect(getTriangleType(4, 5, 3)).toBe('11')
    expect(getTriangleType(10, 2, 2)).toBe('00')
})

test('get Sum', () => {
    expect(getSum(1000)).toBe(1)
    expect(getSum(0)).toBe(0)
    expect(getSum(1234)).toBe(10)
    expect(getSum(9999)).toBe(36)
})

test('is Even Sum Greater', () => {
    expect(isEvenIndexSumGreater([1, 100, 2, 200])).toBe(false)
    expect(isEvenIndexSumGreater([100, 1, 200, 2])).toBe(true)
    expect(isEvenIndexSumGreater([100, 1, 200, 2, 300, 4])).toBe(true)
    expect(isEvenIndexSumGreater([100, 1, 200, 2, 4])).toBe(true)
})

test('is Square Greater Than Circle', () => {
    const sCr = 3.14
    const sSq = 4
    const result = isSquareGreater(sCr, sSq)
    expect(result).toBe(true)
})

test('get banknote list', () => {
    const result2500 = getBanknoteList(2500)
    const result23 = getBanknoteList(23)
    expect(result2500[0]).toBe(1000)
    expect(result2500[1]).toBe(1000)
    expect(result2500[2]).toBe(500)
    expect(result23[0]).toBe(20)
    expect(result23[1]).toBe(2)
    expect(result23[2]).toBe(1)
})