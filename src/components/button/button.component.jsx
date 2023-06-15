
import './button.style.scss';

const Button_Type_Classes = {
    'google': 'google-sign-in',
    'inverted': 'inverted'
}

const Button = ({children, buttonType, buttonProps}) => {

    return (
        <button className={`button-container ${Button_Type_Classes[buttonType]}`}  {...buttonProps}>
            {children}
        </button>
    )

}

export default Button;