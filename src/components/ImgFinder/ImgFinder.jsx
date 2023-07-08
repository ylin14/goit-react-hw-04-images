import Loader from '../../shared/components/Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import { fetch } from '../../shared/api/pixabay';

import s from './imgFinder.module.css';

import { useEffect, useState } from 'react';

function ImgFinder () {
  const [state, setState] = useState({
    images: [],
    isLoading: false,
    error: null
  })

const [query, setQuery] = useState('');
const [pagination, setPagination] = useState({
  page: 1,
  totalPages: 1
});
const [modal, setModal] = useState({
  isModalOpen: false,
  modalImg: {}
})

useEffect(() => {
  const fetchImg = async () => {
    if(!query.trim()) {
      return
    }

    setState({...state, isLoading: false, error: null});

    try {
      const { totalHits, hits } = await fetch(query, pagination.page);

      setState({
        ...state,
        images: [...state.images, ...hits],
        isLoading: false
      });

      setPagination({...pagination, totalPages: totalHits/12})
    } catch (error) {
      setState({...state, error: error.message, isLoading: false});
    }
  }

fetchImg()
}, [query, pagination.page])

const setImages = ( q ) => {
    setQuery(q);
    setPagination({ ...pagination, page: 1 })
    setState({
      images: [],
    });
  };

const loadMore = () => {
  setPagination({...pagination, page: pagination.page + 1});
};

const showModal = modalImg => {
  setModal({
    isModalOpen: true,
    modalImg,
  });
};

const closeModal = () => {
  setModal({
    isModalOpen: false,
    modalImg: {}
  });
};

  const {images, isLoading, error} = state;
  const {totalPages, page} = pagination;
  const {isModalOpen, modalImg} = modal;

return(
  <>
    <Searchbar onSubmit={setImages} />
    {images.length > 0 && (
      <ImageGallery items={images} onClick={showModal} />
    )}
    {isLoading && <Loader />}
    {error && <p>Something went wrong: {error}</p>}
    {totalPages > page && !isLoading && images.length > 0 && (
      <Button text="Load More" onClick={loadMore} />
    )}
    {isModalOpen && (
      <Modal close={closeModal}>
        <img
          src={modalImg.largeImage}
          alt={modalImg.tags}
          className={s.image}
        />
      </Modal>
    )}
  </>
)
}
export default ImgFinder;