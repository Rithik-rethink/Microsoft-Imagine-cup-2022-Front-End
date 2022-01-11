import './App.css';
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import urlParser from "js-video-url-parser";
import { TextField } from '@material-ui/core';
import { FormControlLabel, Checkbox } from '@material-ui/core';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import IconButton from '@material-ui/core/IconButton';

function App() {

  const [count, setCount] = useState(0);
  const [Url, setUrl] = useState('');
  const [Err, setErr] = useState('');
  const [Error, setError] = useState(false);


  const checkUrl = () => {
    const obj = urlParser.parse(Url);
    console.log(obj);
    const providers = ['youtube', 'facebook', 'soundcloud', 'vimeo', 'wistia', 'mixcloud', 'dailymotion', 'twitch'];
    try {
      if (obj.mediaType === 'video') {
        setError(false);
        setErr('');
      }
      if (!obj.provider in providers) {
        setErr(`${obj.provider} isn't supported`);
        return false;
      }
      setError(false);
      return true;
    }
    catch (err) {
      console.log("invalid")
      setErr('Please enter a valid URL');
      return false;
    }

  }


  function handleClick(e) {
    e.preventDefault();
    setCount(1);
    // <p>thie link was clicked</p>
    // console.log('The link was clicked.');
  }


  if (count == 0) {
    return (

      <div style={{
        display: 'flex',
        margin: 'auto',
        width: 400,
        flexWrap: 'wrap',
      }}>

        <div style={{ width: '100%', float: 'left' }}>
          <h3>Enter your reference video?</h3> <br />
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <h3>  OR  </h3>
        <a href="#" onClick={handleClick}>
          Do you have a link?
        </a>

      </div>

    );
  }

  if (count == 1) {
    return (

      <div style={{
        display: 'flex',
        margin: 'auto',
        width: 400,
        flexWrap: 'wrap',
      }}>

        <div style={{ width: '100%', float: 'left' }}>
          <h3>Enter you link?</h3> <br />
        </div>
        <form className='form' noValidate autoComplete="off" onSubmit={() => { checkUrl() }}>
          <TextField id="outlined-basic" className='col-12 col-sm-12 ' label="Enter URL" type='url' variant="outlined" onChange={(e) => {
            setUrl(e.target.value);
          }} />



          {Error ? <p className='error'><b>{Err}</b></p> : <p></p>}
          <Button variant='contained' className='mt-3' color='primary' style={{ width: '30%' }}>Upload</Button>

        </form>
      </div>

    );
  }


}

export default App;
