import { BtnLoad } from './Button.styled';

export const LoadeMore = ({ loadMore }) => {
  return (
    <BtnLoad type="button" onClick={loadMore}>
      Load
    </BtnLoad>
  );
};
