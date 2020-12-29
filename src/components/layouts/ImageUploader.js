import { makeStyles, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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
    borderRadius: "4px",
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
  marginRight: 8,
  marginTop: 24,
  width: 150,
  height: 150,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const thumbButton = {
  position: "absolute",
  right: 10,
  bottom: 10,
  background: "rgba(0,0,0,.8)",
  color: "#fff",
  border: 0,
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.7rem",
  padding: "4px 8px",
};

const ImageUploader = (props) => {
  const [files, setFiles] = useState([]);

  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
      <button type="button" style={thumbButton} onClick={() => {}}>
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
          <strong>Drag 'n' drop</strong> or <strong>click here</strong> to
          select category thumbnail.
        </Typography>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default ImageUploader;
