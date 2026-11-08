import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { LightboxPhotoData, PhotoLightboxModal } from '../components/PhotoLightboxModal';

interface LightboxContextType {
  openPhoto: (photo: LightboxPhotoData) => void;
  openGallery: (photos: LightboxPhotoData[], initialIndex?: number) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [galleryPhotos, setGalleryPhotos] = useState<LightboxPhotoData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPhoto = useCallback((photo: LightboxPhotoData) => {
    setGalleryPhotos([photo]);
    setCurrentIndex(0);
    setIsOpen(true);
  }, []);

  const openGallery = useCallback((photos: LightboxPhotoData[], initialIndex = 0) => {
    setGalleryPhotos(photos);
    setCurrentIndex(initialIndex);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, galleryPhotos.length - 1));
  }, [galleryPhotos.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const currentPhoto = galleryPhotos[currentIndex] || null;

  return (
    <LightboxContext.Provider value={{ openPhoto, openGallery, closeLightbox }}>
      {children}
      <PhotoLightboxModal
        isOpen={isOpen}
        photo={currentPhoto}
        onClose={closeLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < galleryPhotos.length - 1}
        hasPrev={currentIndex > 0}
      />
    </LightboxContext.Provider>
  );
};

export const useLightbox = (): LightboxContextType => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};
