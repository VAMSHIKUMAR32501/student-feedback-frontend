import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Feedback = () => {
  const [fields, setFields] = useState([]);
  const [fieldType, setFieldType] = useState("textual");

  // Add a new field to the form
  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        type: fieldType,
        label: `New ${fieldType} field`,
        value: "",
      },
    ]);
  };

  // Update the label of a field
  const handleFieldChange = (index, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
    setFields(updatedFields);
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    setFields(reorderedFields);
  };

  // Render the feedback form
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Feedback Form
      </Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          style={{ minWidth: "150px" }}
        >
          <MenuItem value="textual">Textual</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="numerical">Numerical</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleAddField}>
          Add Field
        </Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="feedback-form">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <TextField
                        label="Field Label"
                        variant="outlined"
                        size="small"
                        value={field.label}
                        onChange={(e) =>
                          handleFieldChange(index, e.target.value)
                        }
                        style={{ flex: 1 }}
                      />
                      <Typography variant="body2" style={{ minWidth: "100px" }}>
                        {field.type === "textual"
                          ? "Text Input"
                          : field.type === "rating"
                          ? "Rating (1-5)"
                          : "Numerical Input"}
                      </Typography>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Preview:
      </Typography>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: "15px" }}>
          <Typography variant="body1">{field.label}</Typography>
          {field.type === "textual" && (
            <TextField variant="outlined" size="small" fullWidth />
          )}
          {field.type === "rating" && (
            <div>
              {[1, 2, 3, 4, 5].map((rating) => (
                <span key={rating} style={{ marginRight: "5px" }}>
                  {rating}
                </span>
              ))}
            </div>
          )}
          {field.type === "numerical" && (
            <TextField type="number" variant="outlined" size="small" fullWidth />
          )}
        </div>
      ))}
    </div>
  );
};

export default Feedback;
