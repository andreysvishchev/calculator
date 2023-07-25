import classes from './KeyPad.module.scss'
import {data} from "@/components/pages/Main/data";

type KeyPadType = {
    handleKeyPress: (keyCode: number | null, key: string) => void
}

const KeyPad = ({handleKeyPress}: KeyPadType) => {
    const keys = data.keys
    return (
        <div className={classes.Wrap}>
            {keys.map((item, index) =>
                <div key={index}
                     data-style={`${item.style}`}
                     className={classes.Key}
                     onClick={() => handleKeyPress(item.keyCode, item.value)}
                     dangerouslySetInnerHTML={{__html: item.label}}/>
            )}
        </div>
    );
};

export default KeyPad;
