export const Cell = ({children, index, isSelected, updateBoard}) => {
  const className = `cell ${isSelected ? 'is-selected' : ''}`

  const handlerClick = () => {
    return updateBoard(index)
  }
  
  return (
    <div className={className} onClick={handlerClick}>
      <span className="cell-content">
        {children}
      </span>
    </div>
  )
}