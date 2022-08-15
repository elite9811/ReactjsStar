import React from 'react';
import Loader from './Loader';

export default {
  title: 'Loader',
  component: Loader
};

export const Default = () => <Loader />;

export const noOverlay = () => <Loader nobg />;

export const withMessage = () => <Loader message="Something is loading..." />;
