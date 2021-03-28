import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons'

export interface Props {
  onNewButton: () => void
  folded?: boolean
  setFolded?: (folded: boolean) => void
}

const Header: React.FC<Props> = ({ onNewButton, folded, setFolded }) => {
  const buttonClassName = 'hover:bg-yellow-200 hover:text-yellow-800 group flex items-center rounded-md bg-yellow-100 text-yellow-600 text-sm font-medium px-4 py-2 active:bg-yellow-300 focus:ring-yellow-500 focus:ring focus:outline-none'

  return <header className="flex items-center justify-between">
    <h2 className="text-lg leading-6 font-medium text-black">Quick Paste</h2>
    {
      folded !== undefined &&
      setFolded !== undefined &&
      <button
          className={`ml-auto mr-4 ${buttonClassName}`}
          onClick={() => setFolded(!folded)}
      >
        <FontAwesomeIcon icon={folded ? faAngleDown : faAngleUp} className="mr-2"/>
        { folded ? 'Unfold' : 'Fold' }
      </button>
    }
    <button
      className={buttonClassName}
      onClick={() => onNewButton()}
    >
      <FontAwesomeIcon icon={faPlus} className="mr-2"/>
      New
    </button>
  </header>
}

export default Header
