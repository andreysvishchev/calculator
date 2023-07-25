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
            <div className={classes.Expression}>{expression} {equals ? '=' : null}</div>
            <div className={cn(classes.Result,
                {[classes.Small]: result.toString().length > 20},
                {[classes.Small]: result.toString().length > 15})}>{result}</div>
        </div>
    );
};

export default Header;
