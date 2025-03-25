interface ToggleSwitchProps {
  enable: boolean
  offText: string
  onText: string
  onToggle: () => void
}

//toggle artist status button
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enable,
  onText,
  offText,
  onToggle,
}) => (
  <div className='flex items-center space-x-3  rounded-lg'>
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center bg-gray-400 rounded-full p-1  cursor-pointer  ${
        enable ? 'bg-gray-200' : 'bg-gray-600'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform  cursor-pointer ${
          enable ? 'translate-x-6' : ''
        }`}
      />
    </button>
    <span className='text-white font-light'>{enable ? onText : offText}</span>
  </div>
)

export default ToggleSwitch
