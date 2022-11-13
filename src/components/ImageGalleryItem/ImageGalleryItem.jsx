import { GalleryItem, ImageSm } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  smallImg,
  largeImageURL,
  openModal,
}) => {
  return (
    <GalleryItem className="gallery-item" key={id}>
      <ImageSm src={smallImg} alt="" onClick={() => openModal(largeImageURL)} />
    </GalleryItem>
  );
};
