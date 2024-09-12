import "../../App.css"

// eslint-disable-next-line react/prop-types
const Tile = ({className,value, onClick, playerTurn}) => {
  return (
    <div onClick={onClick} className={`tile ${className} ${value===null&&playerTurn}`}>{value}</div>
  )
}

export default Tile