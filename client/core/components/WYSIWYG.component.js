import React, { useState, useContext } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
    border: '1px solid gray',
    minHeight: 50,
  },
}));

export default function WYSIWYG(props) {
  const classes = useStyles();
  const { values, setValues } = props.values;

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(values.content)),
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  const handleOnChange = (name) => (editorState) => {
    setEditorState(editorState);
    setValues({
      ...values,
      [name]: editorState.getCurrentContent().getPlainText('\u0001'),
    });
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
      />
    </div>
  );
}
