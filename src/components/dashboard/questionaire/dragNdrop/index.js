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
	paddingTop: '20px',
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	opacity: isDragging ? 0.6 : 1,
	border: isDragging ? "1px #5048E5 dotted" : "1px lightgrey dotted",

	// styles we need to apply on draggables
	...draggableStyle
})
const getListStyle = () => ({
	padding: grid,
	width: '100%'
})

const DragNDrop = (props) => {

	const { componentsData } = props

	const [state, setState] = useState([componentsData]);

	useEffect(() => {
		setState([componentsData])
	}, [componentsData])

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
			<Grid
				item
				xs={12}
				style={{ display: "block" }}
			>
				<DragDropContext onDragEnd={onDragEnd}>
					{state.map((el, ind) => (
						<Droppable
							key={ind}
							droppableId={`${ind}`}
						>
							{(provided, snapshot) => (
								<Grid
									style={{ border: '3px #eee dotted', cursor: 'move', borderRadius: "5px" }}
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<Typography fullWidth>
										{/* {el.compName} */}
									</Typography>
									{el.map((item, index) => (
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
															display: "flex",
															justifyContent: "space-around"
														}}
													// onMouseOver={}
													>
														<Grid
															item
															sm={12}
															md={12}
															lg={12}
														>
															<Typography
																variant='h5'
																style={{ borderBottom: '1px #5048E5 solid', color: '#5048E5', fontWeight: '400' }}
															>
																{item.title}
															</Typography>
														</Grid>
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

export default DragNDrop
