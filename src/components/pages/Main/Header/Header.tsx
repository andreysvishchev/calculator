import classes from './Header.module.scss'
import cn from 'classnames'

type HeaderType = {
    expression: string
    result: string | number
    equals: boolean
}

const Header = ({expression, result, equals}: HeaderType) => {
    return (
        <div className={classes.Wrap}>
            {equals
                ? <div className={cn(classes.Expression)}>{result}</div>
                : <div className={classes.Expression}>{expression} </div>}


        </div>
    );
};

export default Header;
