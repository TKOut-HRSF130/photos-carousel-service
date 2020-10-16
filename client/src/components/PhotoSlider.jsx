/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';

const Slider = styled.div`
  position: absolute;
  top: 5%;
  left: 34%;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  `;

const Slide = styled.div`
  min-width: 100%;
  height: auto;
  transition: -0.5s;
  overflow: hidden;
`;

// const LeftButton = styled.button`
//   cursor: pointer;
//   outline: 0;
//   position: fixed;
//   top: 34%;
//   left: 29%;
//   background-color: transparent;
//   border: none;
//   background: url(https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/Icons/left_scroll.svg);
//   height: 16px;
//   width: 16px;
// `;

// const RightButton = styled.button`
//   cursor: pointer;
//   outline: 0;
//   position: fixed;
//   top: 34%;
//   right: 33.5%;
//   background-color: transparent;
//   border: none;
//   background: url(https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/Icons/right_scroll.svg);
//   height: 16px;
//   width: 16px;
// `;

const Image = styled.img`
  max-width: 100%;
  max-height: calc(500px - 64px);
  margin: 0 auto;
  align-self: center;
  border-style: none;
`;

const PhotoSlider = ({ photos, x }) => {
  return (
    <Slider>
      {
        photos.map((photo) => {
          return (
            <Slide key={photo.photo_id} style={{ transform: `translateX(${x}%)` }}>
              <Image src={photo.url_path} />
            </Slide>
          );
        })
      }
    </Slider>
  );
};

export default PhotoSlider;
