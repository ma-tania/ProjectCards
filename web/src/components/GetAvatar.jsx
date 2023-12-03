import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../images/user2.png';
import '../styles/index.scss';

function GetAvatar({ update, text }) {

  const fr = new FileReader();
  const myFileField = React.createRef();


  const uploadImage = (ev) => {
    console.log('La usuaria ha abierto la ventana para elegir ficheros');
    console.log('La usuaria ha elegido los ficheros', ev.currentTarget.files);

    console.log(
      'El primero de los ficheros elegidos es',
      ev.currentTarget.files[0]
    );


    if (ev.currentTarget.files.length > 0) {
      const myFile = ev.currentTarget.files[0];

      fr.addEventListener('load', getImage);

      fr.readAsDataURL(myFile);
    }
  };

  const getImage = () => {
    const image = fr.result;

    update(image);

  };

  return (
    <div className="get-avatar btn__project">
      <label className="get-avatar__label">
        {text}
        <input
          type="file"
          ref={myFileField}
          style={{ display: 'none' }}
          onChange={uploadImage}
        />
      </label>
    </div>
  );
}

GetAvatar.propTypes = {
  // avatar: PropTypes.string,
  //updateAvatar: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default GetAvatar;
