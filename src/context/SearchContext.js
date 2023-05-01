import React from 'react'

const SearchContext = React.createContext({
  search: '',
  changeSearch: () => {},
})

export default SearchContext
