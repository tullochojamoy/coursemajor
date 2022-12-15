import './button.css';

/**
 * @param {React<Element>} children Children component that will be rendered in the container.
 * @param {string} className A className to style the container (optional).
 * @param props any props that can be applied to the container.
 */

const Button = ({ children, className = '', ...props }) => (
  <button className={`cm-button ${className ? className : ''}`} {...props}>
    {children}
  </button>
);

export default Button;
