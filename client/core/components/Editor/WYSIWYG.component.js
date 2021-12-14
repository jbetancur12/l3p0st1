import React, { useState, useContext } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import { makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    border: '1px transparent solid',
    padding: '1.5em 2em 2.75em 2em',
    margin: '1.25em',
    fontSize: '100 %',
    letterSpacing: '1.2px',
    borderRadius: '6px',
    textAlign: 'left',
    lineHeight: '1.5em',
    color: 'black',
    background: '#fff',
    fontFamily: 'Roboto',
    overflowY: 'auto',
    height: '50vh',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function WYSIWYG(props) {
  const classes = useStyles();
  const { values, setValues } = props.values;

  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(values.content)),
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  const MAX_LENGTH = 2000;

  const handleOnChange = (name) => (editorState) => {
    setEditorState(editorState);
    setValues({
      ...values,
      [name]: editorState.getCurrentContent().getPlainText('\u0001'),
    });
  };

  const _handleBeforeInput = () => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > MAX_LENGTH - 1) {
      setOpen(true);

      return 'handled';
    }
  };

  const _handlePastedText = (pastedText) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength + pastedText.length > MAX_LENGTH) {
      setOpen(true);

      return 'handled';
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div onClick={focusEditor} className={classes.formControl}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={handleOnChange('content')}
        handleBeforeInput={_handleBeforeInput}
        handlePastedText={_handlePastedText}
        placeholder={<em>Escribe Algo :)</em>}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='warning'>
          Solo puedes escribir máximo 2000 caracteres
        </Alert>
      </Snackbar>
    </div>
  );
}
