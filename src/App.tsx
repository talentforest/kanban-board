import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./data/atom";
import styled from "styled-components";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      // 1) Copy array for immutable
      const copyToDos = [...oldToDos];
      // 2) Delete item on source.index
      copyToDos.splice(source.index, 1);
      // 3) Put back the item on the destination.index
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(provided) => (
            <Board ref={provided.innerRef} {...provided.droppableProps}>
              {toDos.map((toDo, index) => (
                <Draggable key={toDo} draggableId={toDo} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>🌟</span>
                      <p>{toDo}</p>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Board>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
`;

const Board = styled.ul`
  width: 70vw;
  height: 70vh;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Card = styled.li`
  display: flex;
  align-items: center;
  min-height: 50px;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
  span {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 200ms ease;
  }
  span:hover,
  span:active {
    font-size: 1.3rem;
    transform: scale(1.2);
  }
  p {
  }
`;

export default App;
