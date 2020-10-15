/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header.jsx';
import Categorylist from './CategoryList.jsx';
import PhotoContainer from './PhotoContainer.jsx';
import PhotoModal from './PhotoModal.jsx';
// import PhotoSlider from './PhotoSlider.jsx';

const Wrapper = styled.div`
  display: block;
  max-width: 660px;
  max-height: 500px;
  margin: auto;
  position: relative;
  top: 0%;
  bottom: 0%;
  left: 0;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_name: '',
      restaurant_id: 1,
      photos: [],
      ableToRender: false,
      showModal: false,
      morePhotos: 31,
      sliderPhoto: null,
    };
    this.getRestaurantsPhotos = this.getRestaurantsPhotos.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleFoodCategoryClick = this.handleFoodCategoryClick.bind(this);
    this.handleDrinkCategoryClick = this.handleDrinkCategoryClick.bind(this);
    this.handleAtmosphereCategoryClick = this.handleAtmosphereCategoryClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getRestaurantsPhotos();
  }

  getRestaurantsPhotos() {
    axios.get(`api/restaurants/photos/${this.state.restaurant_id}`, {
      params: {
        restaurant_id: this.state.restaurant_id,
      },
    })
      .then((response) => {
        let id;
        if (window.location.href.split('/')[3] === '') {
          id = 1;
        } else {
          id = parseInt(window.location.href.split('?')[1]);
        }
        this.setState({
          ableToRender: true,
          restaurant_name: response.data[0].name,
          restaurant_id: id,
          photos: response.data[0].photos,
          morePhotos: 31,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAllClick(photoId) {
    this.getRestaurantsPhotos();
  }

  handleFoodCategoryClick() {
    const filteredByCategory = this.state.photos.filter((photo) => photo.category === 'Food');
    this.setState({
      photos: filteredByCategory,
      morePhotos: filteredByCategory.length - 9,
    });
  }

  handleDrinkCategoryClick() {
    const filteredByCategory = this.state.photos.filter((photo) => photo.category === 'Drink');
    this.setState({
      photos: filteredByCategory,
      morePhotos: filteredByCategory.length - 9,
    });
  }

  handleAtmosphereCategoryClick() {
    const filteredByCategory = this.state.photos.filter((photo) => photo.category === 'Atmosphere');
    this.setState({
      photos: filteredByCategory,
      morePhotos: filteredByCategory.length - 9,
    });
  }

  handleImageClick(photoId) {
    this.toggleModal();
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  render() {
    const {
      showModal, photos, morePhotos, sliderPhoto,
    } = this.state;
    if (this.state.ableToRender) {
      return (
        <div>
          <div>{showModal ? <PhotoModal showModal={showModal} toggleModal={this.toggleModal} photos={photos} /> : null}</div>
          {/* <div>{showModal ? <PhotoSlider photos={photos} /> : null}</div> */}
          <Wrapper>
            <Header className="header" photos={this.state.photos} />
            <Categorylist
              className="categories"
              photos={photos}
              handleAllClick={this.handleAllClick}
              handleFoodClick={this.handleFoodCategoryClick}
              handleDrinkClick={this.handleDrinkCategoryClick}
              handleAtmosphereClick={this.handleAtmosphereCategoryClick}
            />
            <PhotoContainer
              className="container"
              photos={photos}
              handleClick={this.handleImageClick}
              morePhotos={morePhotos}
              sliderPhoto={sliderPhoto}
            />
          </Wrapper>
        </div>
      );
    }
    return (
      <div></div>
    );
  }
}

export default App;
