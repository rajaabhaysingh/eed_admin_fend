import { makeStyles, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player/lazy";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: theme.spacing(3),
  },
  dropFilesBtn: {
    backgroundColor: theme.palette.background.dark,
    cursor: "pointer",
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: "2px",
  },
}));

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 4,
  border: "1px solid #eaeaea",
  marginTop: 24,
  width: "100%",
  height: "auto",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const thumbButton = {
  position: "absolute",
  right: 10,
  top: 10,
  background: "rgba(255,0,0,.75)",
  color: "#fff",
  border: 0,
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.7rem",
  padding: "4px 8px",
};

const VideoUploader = ({ maxFiles, files, setFiles }) => {
  const [error, setError] = useState("");

  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    maxFiles: maxFiles || 1,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setError(`Maximum ${maxFiles} file(s) allowed. Please try again.`);
      } else {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(new Blob([file])),
            })
          )
        );
        setError("");
      }
    },
  });

  // deleteFile
  const deleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // renderThumbnails
  const renderThumbnails = files.map((file, index) => (
    <div style={thumb} key={index}>
      <div style={thumbInner}>
        <video controls width="100%">
          <source src={file.preview} type={file.type} />
        </video>
      </div>
      <button
        type="button"
        style={thumbButton}
        onClick={() => deleteFile(index)}
      >
        delete
      </button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className={classes.root}>
      <div {...getRootProps({ className: "" })}>
        <input {...getInputProps()} />
        <Typography variant="body2" className={classes.dropFilesBtn}>
          <i style={{ margin: "0 8px" }}>
            <CloudUpload />
          </i>
          <strong>Select</strong> content video file. Only video files
          <strong>(with H.264 or WebM codecs)</strong> are recommended.
        </Typography>
      </div>
      <Alert style={{ marginTop: "16px" }} severity="info">
        <AlertTitle>IMPORTANT</AlertTitle>
        If you aren't able to see <strong>video preview</strong> after selecting
        file, make sure you're uploading video with supported codec only.{" "}
        <strong>
          Supported codec: <code>H.264</code> and <code>WebM</code> only.{" "}
        </strong>
      </Alert>
      {error && (
        <Alert style={{ marginTop: "16px" }} severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <aside style={thumbsContainer}>{renderThumbnails}</aside>
    </section>
  );
};

export default VideoUploader;
