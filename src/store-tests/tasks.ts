export const SUM = 'SUM'
export const SUB = 'SUB'
export const DIV = 'DIV'

export const sum = (salary: number, n: number) => salary + n
export const subtraction = (salary: number, n: number) => salary - n
export const division = (salary: number, n: number) => salary / n
export const multiple = (salary: number, n: number) => salary * n

type StateType = number
type ActionType = {
    type: 'SUM' | 'SUB' | 'DIV' | 'MUL'
    n: number
}

export const reducerSalary = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'SUM':
            return state + action.n
        case 'SUB':
            return state - action.n
        case "DIV":
            return state / action.n
        case "MUL":
            return state * action.n
        default:
            return state
    }
}

export function sumNew(...nums: Array<any>): number {
    return nums.reduce((a, b) => a + b)
}

export function getTriangleType(a: number, b: number, c: number): string {
    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && a === c) {
            return '10'
        }
        if (a === b || a === c || b === c) {
            return '01'
        }
        return '11'
    }
    return '00'
}

export function getSum(n: number): number {
    return n.toString().split('').map(el => Number(el)).reduce((a, b) => a + b)
}

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    const evenNum = arr.filter((el, i) => i % 2 === 0).reduce((a, b) => a + b)
    const oddNum = arr.filter((el, i) => i % 2 !== 0).reduce((a, b) => a + b)
    return evenNum > oddNum
}

export const isSquareGreater = (areaCr: number, areaSq: number): boolean => {
    const diameter = Math.sqrt(areaCr / 3.14) * 2
    const sideSqr = Math.sqrt(areaSq)
    return diameter <= sideSqr
}

export function getBanknoteList(amountOfMoney: number): Array<number> {
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    const resultArr = []

    if (amountOfMoney > 0) {
        for (let i = 0; i < banknotes.length; i++) {
            let note = banknotes[i]

            while (amountOfMoney - note >= 0) {
                amountOfMoney -= note
                resultArr.push(note)
            }
        }
    }

    return resultArr
}