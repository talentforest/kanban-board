import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <BoardArea>
          <Title>{boardId}</Title>
          <List
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </List>
        </BoardArea>
      )}
    </Droppable>
  );
};

interface IBoardAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 3px;
  padding-top: 15px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

const List = styled.ul<IBoardAreaProps>`
  flex-grow: 1;
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  transition: background-color 0.3s ease;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ffcbcb"
      : props.isDraggingFromThis
      ? "#fff6cb"
      : props.theme.boardColor};
`;

export default Board;
