import '../input.scss'
import './input-select.scss'

function InputSelect(
  {
    children,
    className = '',
    id,
    label = null,
    placeholder = null,
    name = null,
    onChange,
    value,
    required
  }) {
  const classes = className ? className + ' input-select' : 'input-select'

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}{required ? <span> *</span> : null}
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

export default InputSelect