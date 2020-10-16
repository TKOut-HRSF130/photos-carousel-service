/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
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
