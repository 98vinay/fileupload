import React from "react";
import "./file.css";
function FileInput(props) {
  return (
    <>
      <fieldset>
        <div className="fileuploadcontainer">
          <div className="fileInputcontainer">
            <div className="fileInput">
              <label htmlFor="file" className="fileInputLabel">
                Choose a file to upload <sup>*</sup>
              </label>
              <input
                type="file"
                id="file"
                onChange={props.onChange}
                accept="video/*,image/*"
              />
            </div>
            <p> File Supported: JPG, PNG, MP4 </p>
          </div>
          {props.selectedFile ? (
            <div className="fileInputText">
              <p className="fileInputTextHeading"> Selected File</p>

              <div className="fileInputTextData">
                <p className="filetitle">{props.selectedFile.name}</p>

                <span className="delete" onClick={props.resetFileInput}>
                  {" "}
                  X
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor="filename" className="filenamelabel">
          {" "}
          Enter an Optional name for the file :{" "}
        </label>
        <input
          id="filename"
          type="text"
          placeholder="Enter optional name"
          onChange={props.filenameChangeHandler}
          value={props.filename}
          className="fileName"
        />
      </fieldset>
    </>
  );
}

export default FileInput;
