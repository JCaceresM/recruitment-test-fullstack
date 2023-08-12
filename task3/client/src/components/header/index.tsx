import './styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Herder = ({ buttons = [] }: { buttons: Record<string, unknown>[]}) => {
    const { user, } = useSelector((state: RootState) => state.auth);

    return (<>

        <div className="header">
            <div className="logo">Hi {user?.name|| 'user'}</div>
            <div className="content">
                {
                    buttons.map((btn: Record<string,unknown>, ind) => (
                        <button key={`${JSON.stringify(btn)}-${ind}`} className="header-button" {...btn}>{btn.title as string}</button>
                    ))
                }
            </div>
        </div></>

    );
};


export default Herder;
