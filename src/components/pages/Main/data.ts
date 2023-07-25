export const data = {
    usedKeyCodes: [
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 13,
        190, 187, 189, 191, 56, 111, 106, 107, 109
    ],
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    operators: ['-', '+', '*', '/', 'x2', 'root', '1/x', 'ce', 'c', '+/-'],
    keys: [
        {
            keyCode: null,
            label: '%',
            value: "%",
            style: 'dark'
        },
        {
            keyCode: null,
            label: 'CE',
            value: 'ce',
            style: 'dark'
        },
        {
            keyCode: null,
            label: 'C',
            value: 'c',
            style: 'dark'
        },
        {
            keyCode: 8,
            label: "⌫",
            value: "backspace",
            style: 'dark'
        },
        {
            keyCode: null,
            label: `<sup>x</sup>/<sub>2</sub>`,
            value: '1/x',
            style: 'dark'
        },
        {
            keyCode: null,
            label: `<span>x </span> <sup>2</sup>`,
            value: 'x2',
            style: 'dark'
        },
        {
            keyCode: null,
            label: '√',
            value: 'root',
            style: 'dark'
        },
        {
            label: "÷",
            keyCode: 111,
            value: "/",
            style: 'dark'
        },
        {
            keyCode: 55,
            label: "7",
            value: '7',
            style: 'light'
        },
        {
            keyCode: 56,
            label: "8",
            value: '8',
            style: 'light'
        },
        {
            keyCode: 57,
            label: "9",
            value: '9',
            style: 'light'
        },
        {
            label: "×",
            keyCode: 56,
            value: "*",
            style: 'dark'
        },
        {
            keyCode: 52,
            label: "4",
            value: '4',
            style: 'light'
        },
        {
            keyCode: 53,
            label: "5",
            value: '5',
            style: 'light'
        },
        {
            keyCode: 54,
            label: "6",
            value: '6',
            style: 'light'
        },
        {
            label: "﹣",
            keyCode: 109,
            value: "-",
            style: 'dark'
        },
        {
            keyCode: 49,
            label: "1",
            value: '1',
            style: 'light'
        },
        {
            keyCode: 50,
            label: "2",
            value: '2',
            style: 'light'
        },
        {
            keyCode: 51,
            label: "3",
            value: '3',
            style: 'light'
        },
        {
            label: "+",
            keyCode: 107,
            value: "+",
            style: 'dark'
        },
        {
            label: '+/-',
            keyCode: null,
            value: '+/-',
            style: 'light'
        },
        {
            keyCode: 48,
            label: "0",
            value: '0',
            style: 'light'
        },
        {
            keyCode: 190,
            label: ".",
            value: '.',
            style: 'light'
        },
        {
            keyCode: 13,
            label: "=",
            value: '=',
            style: 'dark'
        }
    ],
    defaultOperands: {
        one: '0',
        two: '',
        operator: '',
        finally: false,
        intermediateOperator: '', //для вычислений без второго операнда
        expAfterResult: false, // для выечесления через = без второго оператора после выражения
        addNumbersAfterExpression: false, // добавить число полсе выражения
        dotInOpeOperand: false, //точка в пером операнде
        resetTwoOperand: false, // сбросить второй операнд полсе % и т.д
        expForResult: false
    },
    defaultAdditional: {
        one: '',
        two: '',
        operator: '',
        res: '',
        finish: false
    },
}
