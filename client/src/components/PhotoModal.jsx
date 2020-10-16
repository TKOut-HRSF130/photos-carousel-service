/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import PhotoSlider from './PhotoSlider.jsx';

const DescriptionFooter = styled.div`
  position: relative;
  margin: 8px 0 0;
  color: white;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const FooterText = styled.div`
  float: left:
  max-width: 90%;
  margin: 0 8px 0 0;
  display: block;
  line-height: 1.15;
`;

const CloseButton = styled.button`
  position: absolute;
  padding: 25px;
  right: -20px;
  top: 30px;
  overflow: visible;
  background: url(https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/Icons/close_icon.svg);
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const LeftButton = styled.button`
  cursor: pointer;
  outline: 0;
  position: fixed;
  top: 34%;
  left: 29%;
  background-color: transparent;
  border: none;
  background: url(https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/Icons/left_scroll.svg);
  height: 16px;
  width: 16px;
`;

const RightButton = styled.button`
  cursor: pointer;
  outline: 0;
  position: fixed;
  top: 34%;
  right: 33.5%;
  background-color: transparent;
  border: none;
  background: url(https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/Icons/right_scroll.svg);
  height: 16px;
  width: 16px;
`;

const PhotoModal = ({ toggleModal, photos }) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const node = useRef();
  const handleOutsideClick = (event) => {
    if (node.current.contains(event.target)) {
      return;
    }
    closeModal();
    toggleModal();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const [x, setX] = useState(0);
  const goLeft = () => {
    return x === 0 ? setX(-100 * (photos.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    return x === -100 * (photos.length - 1) ? setX(0) : setX(x - 100);
  };

  const dateChange = (date) => {
    const newDate = new Date(date);
    return newDate.toString().split(' ').slice(1, 4).join(' ');
  };

  return (
    <Modal
      className="photo-modal"
      isOpen={modalIsOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, .9)',
        },
        content: {
          maxWidth: '600px',
          maxHeight: '600px',
          padding: '2rem',
          outline: 'none',
          backgroundColor: 'transparent',
          border: 'none',
        },
      }}
    >
      <div ref={node} onClick={handleOutsideClick}>
        <LeftButton onClick={goLeft} />
        <PhotoSlider
          photos={photos}
          x={x}
        >
          <DescriptionFooter>
            <div>
              <FooterText>{`${photos[3].description}`}</FooterText>
              <FooterText>
                {`Dined On ${dateChange(photos[3].date)}`}
              </FooterText>
            </div>
          </DescriptionFooter>
        </PhotoSlider>
        <RightButton onClick={goRight} />
        <CloseButton onClick={toggleModal} aria-label="Close"></CloseButton>
      </div>
    </Modal>
  );
};

export default PhotoModal;
