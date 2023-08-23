import React from 'react'

import * as List from 'assets/icons'

interface IconsProps {
  name: keyof typeof List
}

const Icons: React.FC<IconsProps> = ({ name }) => {
  const Component = List[`${name}`]

  return <Component />
}

export default Icons
