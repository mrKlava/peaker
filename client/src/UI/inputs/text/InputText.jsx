import '../input.scss'
import './input-text.scss'

function InputText(
  {
    children,
    className = '',
    id,
    type = 'text',
    label = null,
    placeholder = null,
    name = null,
    onChange,
    value,
    required
  }) {
  const classes = className ? className + ' input-text' : 'input-text'

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className='input-container'>
        <input
          type={type}
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        {children}
      </div>
    </div>
  )
}

export default InputText