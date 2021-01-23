import {
  Backdrop,
  Box,
  Button,
  colors,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  Modal,
  NativeSelect,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import Editor from "../../../../../components/layouts/Editor";
import React, { useState, useEffect } from "react";
import { Edit, FilePlus } from "react-feather";
import { Alert, AlertTitle } from "@material-ui/lab";
import FormHeader from "../../../../../components/layouts/FormHeader";
import VideoUploader from "../../../../../components/layouts/VideoUploader";
import { CheckCircle, Close, Code } from "@material-ui/icons";
import { addContentAction } from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  marTop: {
    marginTop: theme.spacing(2),
  },
  marTop5: {
    marginTop: theme.spacing(5),
  },
  formHeader: {
    color: colors.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  darkBG: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(2),
    borderRadius: "4px",
  },
  iconBtn: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: theme.spacing(1),
    color: colors.red[600],
  },
  flexEnd: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  modalParent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  modal: {
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[8],
    padding: theme.spacing(3),
  },
  successGreen: {
    color: colors.green[500],
  },
}));

const AddContentForm = ({ courseId, moduleId }) => {
  const programsInitState = {
    language: "c",
    code: "",
  };

  const initialFormState = {
    priority: "",
    topicName: "",
    media: "",
    desc: "",
    duration: "",
    courseId: courseId,
    moduleId: moduleId,
    programs: [programsInitState],
  };

  // local state management
  const [formState, setFormState] = useState(initialFormState);
  const [files, setFiles] = useState([]);
  const [richText, setRichText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();
  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const languageList = [
    {
      key: "C",
      value: "c",
    },
    {
      key: "C++",
      value: "cpp",
    },
    {
      key: "Bash",
      value: "bash",
    },
    {
      key: "Python",
      value: "python",
    },
    {
      key: "Ruby",
      value: "ruby",
    },
    {
      key: "SQL",
      value: "sql",
    },
    {
      key: "Swift",
      value: "swift",
    },
    {
      key: "Matlab",
      value: "matlab",
    },
    {
      key: "Java",
      value: "java",
    },
    {
      key: "Kotlin",
      value: "kotlin",
    },
  ];

  // set files to prop states
  useEffect(() => {
    setFormState({
      ...formState,
      media: files[0],
    });
  }, [files]);

  // set files to prop states
  useEffect(() => {
    setFormState({
      ...formState,
      desc: richText,
    });
  }, [richText]);

  // managing course response
  useEffect(() => {
    if (course.addContentSuccessful) {
      // alert after successful posting
      setModalOpen(true);
      // reset post data after successful posting
      course.addContentSuccessful = false;
      course.addContentData = {};
      course.addContentError = null;
      // clear form after successful submission
      setFormState(initialFormState);
      setFiles([]);
      setRichText("");
    }
  }, [course]);

  // handleAddContent
  const handleAddContent = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("priority", formState.priority);
    formData.append("topicName", formState.topicName);

    if (formState.desc) {
      formData.append("desc", JSON.stringify(formState.desc));
    }

    if (formState.media) {
      formData.append("media", formState.media);
    }

    // if empty key valur pair exists in programs
    if (formState.programs?.length > 0) {
      for (let i = 0; i < formState.programs.length; i++) {
        if (formState.programs[i].code === "") {
          formState.programs.splice(i, 1);
        }
      }
    }

    // rechecking if still valid data are present in programs
    if (formState.programs?.length > 0) {
      formData.append("programs", JSON.stringify(formState.programs));
    }

    formData.append("duration", formState.duration);
    formData.append("courseId", formState.courseId);
    formData.append("moduleId", formState.moduleId);

    dispatch(addContentAction(formData));
  };

  // handleChange
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // handleProgramChange
  const handleProgramChange = (e, i) => {
    const updatedProgram = [...formState.programs];
    updatedProgram[i][e.target.id] = e.target.value;

    setFormState({
      ...formState,
      programs: updatedProgram,
    });
  };

  // handleCodeDelete
  const handleCodeDelete = (e, i) => {
    e.preventDefault();

    const updatedPrograms = [...formState.programs];

    if (formState?.programs?.length > 1) {
      updatedPrograms.splice(i, 1);
    }

    setFormState({
      ...formState,
      programs: updatedPrograms,
    });
  };

  // renderCodeInput
  const renderCodeInput = () => {
    return formState.programs.map((inputGroup, i) => {
      const languageId = `language${i}`;
      const codeId = `code${i}`;

      return (
        <Box key={i} className={clsx("fcol w-100 mar_t-16", classes.darkBG)}>
          <div className="fc w-100">
            <FormControl fullWidth={true}>
              <InputLabel>Select language*</InputLabel>
              <NativeSelect
                style={{ padding: "0 8px" }}
                name={languageId}
                value={formState.programs[i].language}
                onChange={(e) => handleProgramChange(e, i)}
                label="Select language*"
                inputProps={{
                  id: "language",
                }}
              >
                {languageList.map((language, i) => (
                  <option value={language.value} key={i}>
                    {language.key}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <IconButton
              className={classes.iconBtn}
              color="primary"
              size="medium"
              type="button"
              disabled={formState?.programs?.length <= 1}
              onClick={(e) => {
                handleCodeDelete(e, i);
              }}
            >
              <Close />
            </IconButton>
          </div>
          <pre className="w-100">
            <code className="w-100">
              <TextareaAutosize
                className={classes.marTop}
                style={{ padding: "16px", width: "100%", outline: "none" }}
                aria-label="text area for code"
                rowsMin={3}
                placeholder="Your code goes here..."
                id="code"
                name={codeId}
                value={formState.programs[i].code}
                onChange={(e) => handleProgramChange(e, i)}
              />
            </code>
          </pre>
        </Box>
      );
    });
  };

  return (
    <Box className={clsx(classes.marTop5, classes.root)}>
      <form
        onSubmit={handleAddContent}
        style={{ maxWidth: "800px" }}
        encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <FormHeader
              cssClass={classes.formHeader}
              heading="Add content"
              icon={<Edit />}
            />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Alert severity="info">
              <AlertTitle>NOTICE</AlertTitle>
              Adding new content will append new entry under selected module. If
              you wish to edit previously available content, click on edit
              button against desired topic above.
            </Alert>
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <TextField
              size="small"
              label="Priority*"
              variant="outlined"
              name="priority"
              value={formState.priority}
              onChange={handleChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <TextField
              size="small"
              label="Content duration*"
              variant="outlined"
              name="duration"
              value={formState.duration}
              onChange={handleChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <TextField
              size="small"
              label="Topic name*"
              variant="outlined"
              name="topicName"
              value={formState.topicName}
              onChange={handleChange}
              fullWidth={true}
            />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography
              className={classes.marginBottom}
              variant="body2"
              color="textSecondary"
            >
              Content:
            </Typography>
            <Editor richText={richText} setRichText={setRichText} />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography
              className={classes.marginBottom}
              variant="body2"
              color="textSecondary"
            >
              Video content:
            </Typography>
            <VideoUploader maxFiles={1} files={files} setFiles={setFiles} />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography
              className={classes.marginBottom}
              variant="body2"
              color="textSecondary"
            >
              Related code:
            </Typography>
            {renderCodeInput()}
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.marTop}
              startIcon={<Code />}
              disabled={!formState.programs?.slice(-1)[0]?.code?.length > 0}
              onClick={() => {
                setFormState({
                  ...formState,
                  programs: [...formState.programs, programsInitState],
                });
              }}
            >
              ADD MORE PROGRAMS
            </Button>
          </Grid>
          {course.addContentError && (
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Alert className="w-100" severity="error">
                <AlertTitle>Error</AlertTitle>
                {course.addContentError}
              </Alert>
            </Grid>
          )}
          <Grid
            className={classes.flexEnd}
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FilePlus />}
              disabled={
                !formState.priority ||
                !formState.topicName ||
                course.addContentLoading
              }
            >
              ADD CONTENT
            </Button>
          </Grid>
        </Grid>
      </form>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modalParent}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.modal}>
            <Typography variant="h3" className={classes.successGreen}>
              <i className="mar_r-16">
                <CheckCircle />
              </i>
              Success!
            </Typography>
            <Typography
              className={classes.marTop}
              variant="body2"
              id="simple-modal-description"
              color="textSecondary"
            >
              New content was added successfully. You can view them under{" "}
              <strong>courses/</strong> section.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              className={classes.marTop}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              OKAY
            </Button>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddContentForm;
