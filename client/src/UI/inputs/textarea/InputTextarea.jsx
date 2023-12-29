import '../input.scss'
import './input-textarea.scss'

function InputTextarea(
  {
    children,
    className = '',
    id,
    label = null,
    placeholder = null,
    name = null,
    onChange,
    value
  }) {
  const classes = className ? className + ' textarea' : 'textarea'

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className='textarea-container'>
        <textarea
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
          {children}
        </textarea>
      </div>
    </div>
  )
}

export default InputTextarea