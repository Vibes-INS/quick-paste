import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export interface Props {
  onNewButton: () => void
}

const Header: React.FC<Props> = ({ onNewButton }) => {
  return <header className="flex items-center justify-between">
    <h2 className="text-lg leading-6 font-medium text-black">Quick Paste</h2>
    <button
      className="hover:bg-yellow-200 hover:text-yellow-800 group flex items-center rounded-md bg-yellow-100 text-yellow-600 text-sm font-medium px-4 py-2 active:bg-yellow-300"
      onClick={() => onNewButton()}
    >
      <FontAwesomeIcon icon={faPlus} className="mr-2"/>
      New
    </button>
  </header>
}

export default Header
