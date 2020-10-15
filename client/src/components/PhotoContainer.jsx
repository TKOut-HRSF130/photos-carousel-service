/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable-next-line react/self-closing-comp */

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  height: 300px;
  max-width: 100%;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: repeat(2, 50%);
  grid-auto-rows: 50%;
  column-gap: 2px;
  grid-gap: 2px;
`;

const PhotoGrid = styled.div`
  display: grid;
  height: 300px;
  max-width: 100%;
  position: absolute;
  grid-template-columns: 25% auto 30%;
  grid-template-rows: repeat(2, 50%);
  grid-gap: 2px;
  column-gap: 2px;
  justify-items: center;
  align-items: center;
`;

const InnerGrid = styled.div`
  grid-area: 1 / 3 / 3 / 4 ;
  display: grid;
  height: 301.5px;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(3, 33.333%);
  column-gap: 2px;
  justify-items: center;
  align-items: center;
`;

const CustomPhoto = styled.figure`
  height: 100%;
  max-width: 100%;
  margin: auto;
  object-fit: cover;
`;

const Photo = styled.figure`
  height: 100%;
  width: 100%;
`;

const PhotoOne = styled(Photo)`
  grid-area: 1 / 1 / 2 / 2 ;
`;
const PhotoTwo = styled(Photo)`
  grid-area: 2 / 1 / 3 / 2 ;
`;
const PhotoThree = styled(Photo)`
  grid-area: 1 / 2 / 3 / 3 ;
`;
const PhotoFour = styled(Photo)`
grid-area: 1 / 1 / 2 / 2 ;
padding-bottom: 1px;
`;
const PhotoFive = styled(Photo)`
  grid-area: 2 / 1 / 3 / 2 ;
  padding-top: 2px;
  padding-bottom: 2px;
`;
const PhotoSix = styled(Photo)`
grid-area: 3 / 1 / 4 / 2 ;
padding-top: 2px;
`;
const PhotoSeven = styled(Photo)`
grid-area: 1 / 2 / 2 / 3 ;
padding-bottom: 1px;
`;
const PhotoEight = styled(Photo)`
grid-area: 2 / 2 / 3 / 3 ;
padding-top: 2px;
padding-bottom: 2px;
`;
const PhotoNine = styled(Photo)`
  grid-area: 3 / 2 / 4 / 3 ;
  background-color: black;
  margin-top: 18px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;
const LastImage = styled(Image)`
  backgroud-color: black;
  opacity: .8;

  &:hover{
    opacity: .4;
  }
`;
const MorePhotosText = styled.div`
  color: #a9aba9;
  position: absolute;
  bottom: 45px;
  right: 16px;

  &:hover{
    cursor: pointer;
  }
`;

const PhotoContainer = ({
  photos, handleClick, morePhotos,
}) => {
  if (photos.length >= 9) {
    return (
      <PhotoGrid>
        <PhotoOne>
          <Image onClick={handleClick} src={`${photos[0].url_path}`}></Image>
        </PhotoOne>
        <PhotoTwo>
          <Image onClick={handleClick} src={`${photos[1].url_path}`}></Image>
        </PhotoTwo>
        <PhotoThree>
          <Image onClick={handleClick} src={`${photos[2].url_path}`}></Image>
        </PhotoThree>
        <InnerGrid>
          <PhotoFour>
            <Image onClick={handleClick} src={`${photos[3].url_path}`}></Image>
          </PhotoFour>
          <PhotoFive>
            <Image onClick={handleClick} src={`${photos[4].url_path}`}></Image>
          </PhotoFive>
          <PhotoSix>
            <Image onClick={handleClick} src={`${photos[5].url_path}`}></Image>
          </PhotoSix>
          <PhotoSeven>
            <Image onClick={handleClick} src={`${photos[6].url_path}`}></Image>
          </PhotoSeven>
          <PhotoEight>
            <Image onClick={handleClick} src={`${photos[7].url_path}`}></Image>
          </PhotoEight>
          <PhotoNine>
            <LastImage onClick={handleClick} src={`${photos[8].url_path}`}></LastImage>
            <MorePhotosText onClick={handleClick}>+{`${morePhotos}`} More</MorePhotosText>
          </PhotoNine>
        </InnerGrid>
      </PhotoGrid>
    );
  }
  return (
    <Wrapper>{
      photos.map((photo) => {
        return (
          <CustomPhoto key={photo.photo_id}>
            <Image onClick={handleClick} src={`${photo.url_path}`}></Image>
          </CustomPhoto>
        );
      })
    }
    </Wrapper>
  );
};

export default PhotoContainer;
