export const Square = ({ index, turn, content, changeTurn }) => {
  return (
    <>
      <div onClick={() => changeTurn(index)} className="square board">
        {content}
      </div>
    </>
  )
}
