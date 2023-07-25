import classes from './Main.module.scss'
import Header from "@/components/pages/Main/Header/Header";
import KeyPad from "@/components/pages/Main/KeyPad/KeyPad";
import {useState} from "react";
import {data} from "@/components/pages/Main/data";

type OperandsType = {
    one: string | number
    two: string | number
    operator: string
    finally: boolean
    intermediateOperator: string
    expAfterResult: boolean
    addNumbersAfterExpression: boolean
    dotInOpeOperand: boolean
    resetTwoOperand: boolean
    expForResult: boolean
}

type AdditionalType = {
    one: string | number
    two: string | number
    operator: string
    res: string | number
    finish: boolean
}

const Main = () => {
    const {defaultOperands, defaultAdditional, numbers, operators, usedKeyCodes} = data
    let intermediateResult: string | number = ''
    const [equals, setEquals] = useState(false)
    const [expression, setExpression] = useState<string>('0')
    const [result, setResult] = useState<string | number>('')
    const [operands, setOperands] = useState<OperandsType>(defaultOperands)
    const [additional, setAdditional] = useState<AdditionalType>(defaultAdditional)

    const handleKeyPress = (keyCode: number | null, key: string) => {
        setEquals(false)
        if (key === 'ce') clearAllHandler()

        if (key === 'c') clearHandler()

        if (key === 'root') rootHandler()

        if (key === 'x2') sqrHandler()

        if (key === '1/x') fractionHandler()

        if (key === '%') percentHandler()

        if (key === '+/-') decrementHandler()

        if (!keyCode) return

        if (!usedKeyCodes.includes(keyCode)) return

        if (numbers.includes(key)) {
            setAdditional(prevState => ({...prevState, finish: false}))
            numsHandler(key)
        } else if (operators.includes(key)) {
            setAdditional(prevState => ({...prevState, finish: false}))
            operatorsHandler(key)
        } else if (key === '.') {
            dotHandler(key)
        } else if (keyCode === 8) {
            backspaceHandler()
        } else if (keyCode === 13) {
            equalsHandler()
        }
    }

    const decrementHandler = () => {
        if (!expression) return
        if (operands.one === '0') return

        if (operands.one !== '' && operands.two !== '' && operands.finally) {
            const newExp = expression.split('')
            const length1 = operands.one.toString().length
            const length2 = operands.two.toString().length
            newExp.splice(+length1 + 1, +length2)
            if (+operands.two < 0) {
                setExpression(newExp.join('') + Math.abs(+operands.two))
                setOperands(prev => ({...prev, two: Math.abs(+operands.two)}))
            } else {
                setExpression(newExp.join('') + +operands.two * -1)
                setOperands(prev => ({...prev, two: +operands.two * -1}))
            }

            return
        }

        if (operands.one !== '') {
            if (+operands.one < 0) {
                setExpression(Math.abs(+operands.one).toString())
                setOperands(prev => ({...prev, one: Math.abs(+operands.one)}))
            } else {
                setExpression((+operands.one * -1).toString())
                setOperands(prev => ({...prev, one: +operands.one * -1}))
            }
        }
    }

    const percentHandler = () => {
        if (!expression) return
        if (operands.one === '0') return
        if (operands.two === '' && operands.operator === '') return

        setEquals(true)

        const newExp = expression.split('')
        const length1 = operands.one.toString().length
        const length2 = operands.two.toString().length
        newExp.splice(+length1 + 1, +length2)

        if (operands.operator === '+') {
            const percent = (+operands.one / 100) * +operands.two
            setOperands(prev => ({...prev, two: percent, resetTwoOperand: true}))
            setExpression(newExp.join('') + percent)
        }

        if (operands.operator === '-') {
            const percent = (+operands.one / 100) * +operands.two
            setOperands(prev => ({...prev, two: percent, resetTwoOperand: true}))
            setExpression(newExp.join('') + percent)
        }

        if (operands.operator === '*') {
            const percent = +operands.two / 100
            setOperands(prev => ({...prev, two: percent.toFixed(2), resetTwoOperand: true}))
            setExpression(newExp.join('') + percent.toFixed(2))
        }

        if (operands.operator === '/') {
            const percent = +operands.two / 100
            setOperands(prev => ({...prev, two: percent.toFixed(2), resetTwoOperand: true}))
            setExpression(newExp.join('') + percent.toFixed(2))
        }

        return
    }

    const fractionHandler = () => {
        if (!expression) return
        if (operands.one === '0') return

        setEquals(true)

        if (operands.one !== '' && result !== '' && !operands.finally) {
            setResult((1 / +result).toFixed(6))
            setExpression((1 / +result).toFixed(6).toString())
            setOperands(prev => ({...prev, one: (1 / +operands.one).toFixed(6)}))
            return
        }

        if (operands.one !== '' && operands.finally && operands.operator !== '') {
            setOperands(prev => ({...prev, two: (1 / +operands.two).toFixed(6), resetTwoOperand: true}))
            const newExp = expression.split('')
            const length1 = operands.one.toString().length
            const length2 = operands.two.toString().length
            newExp.splice(+length1 + 1, +length2)
            setExpression(newExp.join('') + (1 / +operands.two).toFixed(6))
            return
        }
        if (operands.one !== 0) {
            setResult((1 / +operands.one).toFixed(6))
            setExpression((1 / +operands.one).toFixed(6).toString())
            setOperands(prev => ({...prev, one: (1 / +operands.one).toFixed(6), addNumbersAfterExpression: true}))
            return
        }
    }

    const sqrHandler = () => {
        if (!expression) return
        if (operands.one === '0') return

        setEquals(true)

        if (operands.one !== '' && result !== '' && !operands.finally) {
            setResult(Math.pow(+result, 2))
            setExpression((Math.pow(+result, 2)).toString())
            setOperands(prev => ({...prev, one: Math.pow(+operands.one, 2)}))
            return
        }

        if (operands.one !== '' && operands.finally && operands.operator !== '') {
            setOperands(prev => ({...prev, two: Math.pow(+operands.two, 2), resetTwoOperand: true}))
            const newExp = expression.split('')
            const length1 = operands.one.toString().length
            const length2 = operands.two.toString().length
            newExp.splice(+length1 + 1, +length2)
            setExpression(newExp.join('') + Math.pow(+operands.two, 2))
            return
        }
        if (operands.one !== 0) {
            setResult(Math.pow(+operands.one, 2))
            setExpression((Math.pow(+operands.one, 2)).toString())
            setOperands(prev => ({...prev, one: Math.pow(+operands.one, 2), addNumbersAfterExpression: true}))
            return
        }
    }

    const rootHandler = () => {
        if (!expression) return
        if (operands.one === '0') return

        setEquals(true)

        if (operands.one !== '' && result !== '' && !operands.finally) {
            setResult(Math.sqrt(+result).toFixed(6))
            setExpression((Math.sqrt(+result).toFixed(6)).toString())
            setOperands(prev => ({...prev, one: Math.sqrt(+operands.one).toFixed(6)}))
            return
        }

        if (operands.one !== '' && operands.finally && operands.operator !== '') {
            setOperands(prev => ({...prev, two: Math.sqrt(+operands.two).toFixed(6), resetTwoOperand: true}))
            const newExp = expression.split('')
            const length1 = operands.one.toString().length
            const length2 = operands.two.toString().length
            newExp.splice(+length1 + 1, +length2)
            setExpression(newExp.join('') + Math.sqrt(+operands.two).toFixed(6))
            return
        }
        if (operands.one !== 0) {
            setResult(Math.sqrt(+operands.one).toFixed(6))
            setExpression((Math.sqrt(+operands.one).toFixed(6)).toString())
            setOperands(prev => ({...prev, one: Math.sqrt(+operands.one).toFixed(6), addNumbersAfterExpression: true}))
            return
        }
    }

    const clearHandler = () => {
        if (operands.two !== '') {
            setOperands((prev) => ({...prev, two: ''}))
            const strExp = expression.split('')
            const oneOperands = []
            for (let i = 0; i < strExp.length; i++) {
                if (operators.includes(strExp[i])) {
                    setExpression(oneOperands.join('') + operands.operator)
                    setOperands((prev) => ({...prev, two: ''}))
                    return
                }
                if (strExp[i] !== undefined) oneOperands.push(strExp[i])
            }
        } else if (operands.two === '' && operands.one !== '') {
            setOperands(defaultOperands)
            setExpression('0')

            return
        }
    }

    const clearAllHandler = () => {
        setOperands(defaultOperands)
        setExpression('0')
        setResult('')
        return
    }

    const numsHandler = (key: string | number) => {
        if (key === '0') {
            if (operands.one === '0') {
                return
            }
        }

        if (operands.resetTwoOperand) {
            const newExp = expression.split('')
            const length1 = operands.one.toString().length
            const length2 = operands.two.toString().length
            newExp.splice(+length1 + 1, +length2)
            setExpression(newExp.join('') + key)
            setOperands(prev => ({...prev, two: key, resetTwoOperand: false}))
            return
        }

        if (operands.one !== '' && operands.two !== '' && operands.finally && intermediateResult !== '') {
            setOperands(prev => ({...prev, one: key, two: '', finally: false, operator: ''}))
            setExpression(key.toString())
            return
        }
        if (operands.one !== '' && operands.finally && operands.operator !== '') {
            if (operands.two.toString().length > 10) return
            setOperands(prev => ({...prev, two: prev.two + key.toString()}))
            setExpression(expression + key)
            return
        }
        if (operands.one !== '' && operands.addNumbersAfterExpression) {
            setOperands(prev => ({...prev, one: key, addNumbersAfterExpression: false}))
            setExpression(key.toString())
            return
        }
        if ((operands.one !== '', operands.two === '', !operands.finally, result !== '')) {
            setOperands(prev => ({...prev, finally: true}))
        }
        if (operands.one === '0') {
            setOperands(prev => ({...prev, one: key}))
            setExpression(key.toString())
            return
        }
        if (operands.one.toString().length > 10) return
        setOperands(prev => ({...prev, one: prev.one + key.toString()}))
        setExpression(expression + key)
    }

    const operatorsHandler = (key: string) => {
        if (!expression) return

        const operandOne = operands.one.toString().split('')
        const lastCharOneOperands = operandOne.slice(-1).join('')

        setOperands((prev) => ({...prev, intermediateOperator: key}))

        if (key === '%') {
            percentHandler()
        }

        if (lastCharOneOperands === '.') {
            const newExp = operands.one.toString().split('')
            newExp.splice(operands.one.toString().length - 1)
            setOperands(prev => ({...prev, one: newExp.join(''), operator: key, finally: true}))
            setExpression(newExp.join('') + key)
            return
        }
        // бесконечные без знака =
        if (operands.one !== '' && operands.two !== '' && operands.finally) {
            // console.log('operant 1')
            setOperands(prev => ({...prev, one: calculateResult()!, two: '', operator: key}))
            setExpression(calculateResult() + key)
            setResult(intermediateResult)
            intermediateResult = ''
            return
        }
        if (operands.operator !== '' && operands.one !== '') {
            // console.log('operant 2')
            setOperands(prev => ({...prev, operator: key}))
            let newArr = expression.split('')
            newArr.splice(-1, 1)
            const newExp = newArr.join('')
            setExpression(newExp + key)
            return
        }
        //после равно выражение с результатом
        if (operands.one !== '' && operands.two === '' && !operands.finally && result !== '' && operands.expForResult) {
            // console.log('operant 3')
            setOperands(prev => ({...prev, one: result, finally: true, operator: key, expForResult: false}))
            setExpression(result + key)
            return
        }
        // console.log('operant 4')
        setOperands(prev => ({...prev, finally: true, operator: key}))
        setExpression(expression + key)
    }

    const dotHandler = (key: string) => {
        if (!expression) return
        if (operands.two === '' && operands.addNumbersAfterExpression) {
            return
        }
        if (operands.one !== '' && operands.two !== '' && operands.finally) {
            if (operands.two.toString().includes('.')) return
            setOperands(prev => ({...prev, two: prev.two + key}))
            setExpression(expression + key)
            return
        }
        if (operands.one.toString().includes('.')) return
        setOperands(prev => ({...prev, one: prev.one + key, dotInOpeOperand: true}))
        setExpression(expression + key)
    }

    const backspaceHandler = () => {
        if (expression === '0') return
        if (operands.two === '' && operands.operator === '' && operands.addNumbersAfterExpression) {
            return
        } else if (operands.two !== '' && operands.operator !== '') {
            const newOperand = operands.two.toString().split('')
            newOperand.splice(newOperand.length - 1)
            setOperands((prev) => ({...prev, two: newOperand.join('')}))
            const newExp = expression.split('')
            newExp.splice(newExp.length - 1)
            setExpression(newExp.join(''))
        } else if (operands.two === '' && operands.operator === '' && !operands.finally) {
            const newOperand = expression.split('')
            newOperand.splice(newOperand.length - 1)
            setOperands((prev) => ({...prev, one: newOperand.join('')}))
            setExpression(newOperand.join(''))
            if (newOperand.join('') === '') {
                setOperands(prev => ({...prev, one: '0'}))
                setExpression('0')
            }
        } else if (operands.two === '' && operands.operator === '' && result !== '') {
            const newOperand = expression.split('')
            newOperand.splice(newOperand.length - 1)
            setOperands((prev) => ({...prev, one: newOperand.join('')}))
            setExpression(newOperand.join(''))
            if (newOperand.join('') === '') {
                setOperands(prev => ({...prev, one: '0'}))
                setExpression('0')
            }
        }
    }

    const equalsHandler = () => {
        if (!expression) return
        const operandTwo = operands.two.toString().split('')
        const lastCharTwoOperands = operandTwo.slice(-1).join('')

        if (additional.finish) {
            repeat()
        }

        if (lastCharTwoOperands === '.') {
            const newExp = expression.split('')
            newExp.splice(newExp.length - 1)
            setExpression(newExp.join(''))
        }

        if (operands.one !== '' && operands.intermediateOperator !== '' && operands.two === '') {
            if (result !== '' && operands.expAfterResult) {
                const newExp = `${result}${operands.intermediateOperator}${operands.one}`
                setExpression(newExp)
                getResult(result, operands.one)
                return
            }
            setExpression(expression + operands.one)
            getResult(null, operands.one)
            return
        }

        getResult()
    }

    const repeat = () => {
        setExpression(`${additional.one}${additional.operator}${additional.two}`)
        setOperands(prev => ({...prev, one: additional.one, addNumbersAfterExpression: true}))
        let result = eval(`${additional.one}${additional.operator}${additional.two}`)
        const remainder = result.toString().split('.')[1]
        if (remainder && remainder.length > 5) {
            const arr = remainder.split('')
            const newRemainder = arr.slice(0, 5)
            result = `${result.toFixed()}.${newRemainder.join('')}`
        }
        setResult(result)
        setAdditional(prev => ({...prev, one: result}))
        return
    }

    const calculateResult = (num1?: string | number | null, num2?: string | number) => {
        const oneOperand = num1 ? +num1 : +operands.one
        const twoOperand = num2 ? +num2 : +operands.two
        let operator

        if (operands.intermediateOperator) {
            operator = operands.intermediateOperator
        } else {
            operator = operands.operator
        }

        if (operator === '+') {
            intermediateResult = oneOperand + twoOperand
            setResult(intermediateResult)
            setAdditional({
                one: intermediateResult,
                two: twoOperand,
                operator: operator,
                res: intermediateResult,
                finish: true
            })
            setEquals(true)
            return intermediateResult
        }
        if (operator === '-') {
            intermediateResult = oneOperand - twoOperand
            setResult(intermediateResult)
            setAdditional({
                one: intermediateResult,
                two: twoOperand,
                operator: operator,
                res: intermediateResult,
                finish: true
            })
            setEquals(true)
            return intermediateResult
        }
        if (operator === '/') {
            if (operands.two === '0') {
                setResult('Ошибка')
                setOperands(defaultOperands)
                return
            }
            intermediateResult = oneOperand / twoOperand
            const remainder = intermediateResult.toString().split('.')[1]
            if (remainder && remainder.length > 5) {
                const arr = remainder.split('')
                const newRemainder = arr.slice(0, 5)
                intermediateResult = `${intermediateResult.toFixed()}.${newRemainder.join('')}`
            }
            setAdditional({
                one: +intermediateResult,
                two: twoOperand,
                operator: operator,
                res: intermediateResult,
                finish: true
            })
            setEquals(true)
            setResult(intermediateResult)
            return +intermediateResult
        }
        if (operator === '*') {
            intermediateResult = oneOperand * twoOperand
            setAdditional({
                one: intermediateResult,
                two: twoOperand,
                operator: operator,
                res: intermediateResult,
                finish: true
            })
            setEquals(true)
            setResult(intermediateResult)
            return intermediateResult
        }
    }

    const getResult = (num1?: string | number | null, num2?: string | number) => {
        if (num1 && num2) {
            calculateResult(num1, num2)
            setOperands(prev => ({
                ...prev,
                operator: '',
                two: '',
                finally: false,
                addNumbersAfterExpression: true,
                expAfterResult: true,
                expForResult: true,
                dotInOpeOperand: false
            }))
            return
        } else if (num2) {
            calculateResult(null, num2)
            setOperands(prev => ({
                ...prev,
                operator: '',
                two: '',
                finally: false,
                addNumbersAfterExpression: true,
                expAfterResult: true,
                expForResult: true,
                dotInOpeOperand: false
            }))
            return
        } else {
            calculateResult()
            setOperands(prev => ({
                ...prev,
                operator: '',
                two: '',
                finally: false,
                addNumbersAfterExpression: true,
                expAfterResult: false,
                expForResult: true,
                dotInOpeOperand: false,
                intermediateOperator: ''
            }))
            return
        }
    }


    return <div
        tabIndex={0}
        onKeyDown={event => handleKeyPress(event.keyCode, event.key)}
        className={classes.Wrap}>
        <div className={classes.Calc}>
            <Header equals={equals} expression={expression} result={result}/>
            <KeyPad handleKeyPress={handleKeyPress}/>

        </div>
    </div>
}

export default Main
