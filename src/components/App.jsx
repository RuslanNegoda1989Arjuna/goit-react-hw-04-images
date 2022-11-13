import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchPictures from './Api/Api';
import { Div } from './App.styled';
import { LoadeMore } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spiner } from './Loader/Loader';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);

      if (!search) {
        return;
      }

      const data = fetchPictures(search, page);
      data.then(data => {
        // Перевіряємо чи щось знайшли, якщо ні то повідомляємо
        if (data.hits.length === 0) {
          toast.error('Nothing is found !', {
            position: toast.POSITION.TOP_LEFT,
          });
        }

        // Логіка відображення кнопки "Завантажити ще.."
        const show = Math.ceil(data.total / 12);

        setShowLoadMore(page < show);

        // Cетим в стейт галерею, попередню плюс нову
        setGallery(state => {
          return state.concat(data.hits);
        });
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  // Ф-ція на кнопка дозавантаження картинок
  const loadMore = () => {
    setPage(state => state + 1);
  };

  // отримуємо значення з інпут форми пошуку
  const onSearchValue = value => {
    if (value.value === '') {
      return toast.warn('Enter a word for search');
    } else if (value.value === search) {
      return;
    }

    setSearch(value.value);
    setPage(1);
    setGallery([]);
  };

  // Modall
  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImage(largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <Div>
        <Searchbar onSubmit={onSearchValue} />

        {gallery && <ImageGallery gallery={gallery} openModal={openModal} />}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={2500} position="top-left" theme="colored" />
        <div>
          {isLoading && <Spiner />}
          {showLoadMore && <LoadeMore loadMore={loadMore} />}
        </div>
      </Div>
    </>
  );
  // }
};
