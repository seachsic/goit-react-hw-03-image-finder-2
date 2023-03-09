import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import './styles.css';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    query: '',
    currentPage: 1,
    showModal: false,
    modalImage: '',
    modalAlt: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleSearchbarSubmit = query => {
    this.setState({ query: query, currentPage: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      isLoading: true,
    }));
  
    this.fetchImages();
  };
  
  handleImageClick = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      modalImage: largeImageURL,
      modalAlt: tags
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      modalImage: '',
      modalAlt: ''
    });
  };

  fetchImages = () => {
    const { query, currentPage } = this.state;
    const apiKey = '34227355-634b3cfb76d00133b4cb8e037';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${currentPage}&per_page=12`;

    this.setState({ loading: true });

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong with network request');
      })
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          loading: false
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { images, loading, error, showModal, modalImage, modalAlt } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {error && <p>Error: {error.message}</p>}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            image={modalImage}
            alt={modalAlt}
          />
        )}
      </div>
    );
  }
}

export default App;