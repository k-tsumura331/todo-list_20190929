import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import "./styles.css";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const initState = ["寿司を食う", "ラーメンを食う", "酒を飲む", "ビールを飲む"];

const App = () => {
  const [todos, setTodos] = useState(initState);
  const classes = useStyles();

  const [addValue, setAddValue] = useState("");
  const handleAddValue = e => setAddValue(e.target.value);

  const addTodo = e => {
    e.preventDefault();
    setTodos(pre => [...pre, addValue]);
    setAddValue("");
  };

  const removeTodo = targetTodo => {
    const newTodos = todos.filter(todo => todo !== targetTodo);
    setTodos(newTodos);
  };

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Todo list
          </Typography>
          <div className="todo-tool">
            <form onSubmit={addTodo}>
              <input value={addValue} onChange={handleAddValue} required />
              <button>add</button>
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <List>
        {todos.map(todo => {
          return (
            <ListItem>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              {todo}
              <ListItemIcon>
                <DeleteIcon onClick={() => removeTodo(todo)} />
              </ListItemIcon>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
