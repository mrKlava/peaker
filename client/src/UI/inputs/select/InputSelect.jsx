import '../input.scss'
import './input-select.scss'

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
    value
  }) {
  const classes = className ? className + ' input-select' : 'input-select'

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className='input-container'>
        <select
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
        {children}
        </select>
      </div>
    </div>
  )
}

export default InputText