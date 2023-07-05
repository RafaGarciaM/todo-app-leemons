import PropTypes from 'prop-types'

function AddButton({ text, onClick, type = 'button' }) {
  return (
    <button
      onClick={onClick}
      className=" m-5 group flex items-center overflow-hidden rounded-xl border-none bg-[royalblue] py-[0.7em] px-[1em] pl-[0.9em] text-[15px] text-white transition-all duration-200 active:scale-95"
      type={type}
    >
      <div className="group-hover:animate-fly ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-7 fill-white block origin-center transition-transform duration-300 ease-in-out group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <span className="ml-[0.3em] block transition-all duration-300 ease-in-out group-hover:animate-fly">
        {text}
      </span>
    </button>
  )
}

AddButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
}

export default AddButton
