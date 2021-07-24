import { useState } from 'react';
import Dropzone from 'react-dropzone';

const UploadImage = ({ image, handleImageUpload, handleImageRemove }) => {
  const [dropzone, setDropzone] = useState({
    disabled: false,
    hovering: false,
    error: '',
    showImageUploading: false,
  });

  const dropZoneClass = dropzone.hovering
    ? 'drop-border-color image-drop'
    : 'image-drop';

  function onDrop(acceptedFile) {
    setDropzone({
      ...dropzone,
      hovering: false,
      error: '',
      showImageUploading: true,
      disabled: true,
    });
    setDropzone({ ...dropzone, error: 'Image upload disabled' });
  }

  if (image)
    return (
      <div className="i-wrapper">
        <button
          onClick={() => {
            setDropzone({ ...dropzone, disabled: false });
            handleImageRemove();
          }}
          className="btn-danger btn i-rem-btn"
          disabled
        >
          x
        </button>
        <img className="img-fluid" src={image} alt="food" />
      </div>
    );

  return (
    <div className="i-wrapper">
      <Dropzone
        accept="image/png,image/jpeg"
        onDrop={onDrop}
        multiple={false}
        disabled={dropzone.disabled}
        onDragEnter={() => {
          setDropzone({ ...dropzone, hovering: true });
        }}
        onDragLeave={() => {
          setDropzone({ ...dropzone, hovering: false });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={dropZoneClass}>
            <input {...getInputProps()} />
            {dropzone.showImageUploading ? (
              <span className="drop-caption text-muted">
                Image uploading Please wait...
              </span>
            ) : (
              <span className="drop-caption text-muted">
                <i className="fas fa-plus"></i>{' '}
                {dropzone.hovering ? 'Drop your image.' : 'Upload dish image.'}
              </span>
            )}
            {dropzone.error && (
              <p className="alert alert-danger">{dropzone.error}</p>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadImage;
