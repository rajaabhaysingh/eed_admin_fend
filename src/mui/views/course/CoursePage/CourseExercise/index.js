import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Avatar, Box, colors, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";
import ReactPlayer from "react-player/lazy";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark as dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.dark,
    boxShadow: theme.shadows[4],
    padding: "0",
  },
  listItem: {
    height: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    margin: "8px",
    borderRadius: "4px",
    padding: theme.spacing(1),
    width: "calc(100% - 16px)",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    boxSizing: "border-box",
  },
  avatar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
    height: 48,
    width: 48,
  },
  avatarSmall: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
    fontSize: "0.8rem",
    height: 24,
    width: 24,
  },
  navlink: {
    padding: "12px",
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.dark,
    borderRadius: "4px",
    margin: "4px 0",
    cursor: "pointer",
    "&:hover": {
      boxShadow: theme.shadows[8],
    },
  },
  navlinkActive: {
    padding: "12px",
    background: theme.palette.secondary.main,
    color: colors.common.white,
    borderRadius: "4px",
    margin: "4px 0",
  },
  article: {
    padding: theme.spacing(2),
    border: "1px solid",
    borderColor: theme.palette.divider,
    borderRadius: "4px",
    marginTop: theme.spacing(2),
  },
}));

const CourseModule = ({ module, expanded }) => {
  // local state management
  const [activeContent, setActiveContent] = useState(
    module.content?.length > 0 ? module.content[0] : {}
  );
  const [open, setOpen] = useState(expanded ? true : false);
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  // handleChange
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handleClick
  const handleClick = () => {
    setOpen(!open);
  };

  // renderContentLinks
  const renderContentLinks = () => {
    if (module.content?.length > 0) {
      return module.content.map((item) => (
        <div
          onClick={() => setActiveContent(item)}
          className={
            activeContent._id === item._id
              ? classes.navlinkActive
              : classes.navlink
          }
          key={item._id}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.8rem",
            }}
            variant="body2"
          >
            <Avatar className={classes.avatarSmall}>
              <strong>{item.priority}</strong>
            </Avatar>
            {item.topicName}
          </div>
        </div>
      ));
    } else {
      return (
        <Alert severity="warning">
          <AlertTitle>Attention!</AlertTitle>
          No content added in this module.
        </Alert>
      );
    }
  };

  // renderActiveContent
  const renderActiveContent = () => {
    let jsxArray = [];

    // if content has media, render video player
    if (activeContent?.media) {
      jsxArray.push(
        <ReactPlayer
          key={activeContent._id.toString() + "media"}
          controls
          width="100%"
          height="100%"
          url={`${process.env.REACT_APP_VIDEO_URL_BASE}/${activeContent.media}`}
        />
      );
    }

    if (activeContent?.desc) {
      const contentState = convertFromRaw(
        JSON.parse(activeContent?.desc?.length > 0 ? activeContent.desc : "{}")
      );
      const editorState = EditorState.createWithContent(contentState);

      jsxArray.push(
        <Box
          key={activeContent._id.toString() + "desc"}
          className={classes.article}
        >
          <Editor editorState={editorState} readOnly={true} />
        </Box>
      );
    }

    if (activeContent?.programs?.length > 0) {
      jsxArray.push(
        <Box mt={5} key={"programs"}>
          <Typography variant="h3" style={{ marginBottom: "16px" }}>
            Related codes:
          </Typography>
          <AppBar
            style={{ borderRadius: "4px 4px 0 0" }}
            position="static"
            color="default"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              style={{ border: "none" }}
              aria-label="program tabs"
            >
              {activeContent.programs.map((program, i) => (
                <Tab key={i} label={program.language} />
              ))}
            </Tabs>
          </AppBar>
          {activeContent.programs.map((program, i) => (
            <div
              role="tabpanel"
              hidden={value !== i}
              value={i}
              key={i}
              style={{ whiteSpace: "pre-wrap" }}
            >
              <SyntaxHighlighter
                wrapLongLines
                wrapLines
                showLineNumbers
                language={program.language}
                style={dark}
              >
                {program.code}
              </SyntaxHighlighter>
            </div>
          ))}
        </Box>
      );
    }

    return jsxArray;
  };

  return (
    <List aria-labelledby="nested-list-subheader" className={classes.root}>
      <ListItem className={classes.listItem} button onClick={handleClick}>
        <ListItemIcon>
          <Avatar className={classes.avatar}>
            <strong>{module.moduleNo}</strong>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={module.moduleName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid className={classes.paper} container spacing={2}>
          <Grid className="fcol" item xl={9} lg={9} sm={12} xs={12}>
            {renderActiveContent()}
          </Grid>
          <Grid className="fcol" item xl={3} lg={3} sm={12} xs={12}>
            {renderContentLinks()}
          </Grid>
        </Grid>
      </Collapse>
    </List>
  );
};

export default CourseModule;
