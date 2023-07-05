import PropTypes from 'prop-types'

function Input({ text, name }) {
  return (
    <div className="relative">
      <input
        name={name}
        required
        className="w-full peer focus:outline-none valid:outline-none focus:border-sky-500 valid:border-sky-500 dark:focus:border-sky-500 dark:valid:border-sky-500 rounded-2xl border-2 border-solid border-gray-50 bg-transparent p-4 text-base text-white transition-all duration-150 ease-in-out"
        type="text"
      />
      <label className="peer-focus:-translate-y-2/4 peer-focus:scale-90 peer-valid:bg-slate-800 peer-focus:bg-slate-800 peer-focus:py-0 peer-focus:px-1 peer-valid:py-0 peer-valid:px-2 peer-focus:text-sky-500 peer-valid:text-sky-500 peer-valid:-translate-y-2/4 peer-valid:scale-90 absolute left-4 text-white pointer-events-none translate-y-4 transition-all duration-150 ease-in-out">
        {text}
      </label>
    </div>
  )
}

Input.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string
}

export default Input
