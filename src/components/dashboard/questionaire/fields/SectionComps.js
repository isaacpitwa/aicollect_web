import React, { useState, useEffect, useContext } from "react";
import {
	TextField,
	Grid,
	Button,
	Typography
} from '@mui/material'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: '15px',
	margin: `0 0 ${grid}px 0`,
	borderRadius: "5px",
	opacity: isDragging ? 0.6 : 1,
	border: isDragging ? "1px #5048E5 dotted" : "1px lightgrey dotted",

	// styles we need to apply on draggables
	...draggableStyle
})
const getListStyle = isDraggingOver => ({
	padding: grid,
	width: '100%',
	border: isDraggingOver ? "1px grey dotted" : "1px lightgrey dotted"
})

const SectionComps = (props) => {
	const { comps } = props
	const [state, setState] = useState([comps]);

	useEffect(() => {
		setState([comps])
	}, [comps])

	function onDragEnd(result) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}
		const sInd = +source.droppableId;
		const dInd = +destination.droppableId;

		if (sInd === dInd) {
			const items = reorder(state[sInd], source.index, destination.index);
			const newState = [...state];
			newState[sInd] = items;
			setState(newState);
		} else {
			const result = move(state[sInd], state[dInd], source, destination);
			const newState = [...state];
			newState[sInd] = result[sInd];
			newState[dInd] = result[dInd];

			setState(newState.filter((group) => group.length));
		}
	}

	return (
		<Grid container>
			<Grid item xs={12} style={{ display: "block" }}>
				<DragDropContext onDragEnd={onDragEnd}>
					{state?.map((el, ind) => (
						<Droppable key={ind} droppableId={`${ind}`}>
							{(provided, snapshot) => (
								<Grid
									style={{ border: '3px #eee dotted', cursor: 'move', }}
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
									{...provided.droppableProps}
								>
									<Typography fullWidth>
										{/* {el.compName} */}
									</Typography>
									{el?.map((item, index) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style
													)}
												>
													<Grid
														style={{
															justifyContent: "space-around"
														}}
													// onMouseOver={}
													>
														<TextField
															label={item.title}
															variant="outlined"
															fullWidth
														/>
													</Grid>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</Grid>
							)}
						</Droppable>
					))}
				</DragDropContext>
			</Grid>
		</Grid>
	);
}

export default SectionComps
