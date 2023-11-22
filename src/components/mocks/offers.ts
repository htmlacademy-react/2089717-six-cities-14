import { TOffer } from '../../types';

function generateMultipleOffers(count: number): TOffer[] {
  const images = [
    '../img/apartment-01.jpg',
    '../img/apartment-02.jpg',
    '../img/apartment-03.jpg',
    '../img/room.jpg',
  ];
  const smalllImages = [
    '',
    '',
    '../img/apartment-03.jpg',
    '../img/room-small.jpg',
  ];
  const headers = [
    'Small comfortable apartment',
    'Luxurious Beachfront room',
    'Cozy Mountain Cabin',
    'Downtown Loft in the City',
  ];
  const descriptions = [
    'Offering a terrace or balcony with views of the sea and mountain.',
    'Stunning villa with private pool and beachfront views.',
    'Rustic cabin in the woods with a fireplace and mountain views.',
    'Modern loft apartment in the heart of the city with cityscape views',
  ];
  const isPrimeValues = [true, false, true, false];
  const isFavoritValues = [false, false, true, true];
  const housingTypes = ['apartment', 'room', 'house', 'hotel'];
  const ratings = [4.5, 4.2, 4.0, 4.7];
  const bedroomQuantities = [3, 5, 2, 1];
  const maxGuestValues = [5, 10, 3, 4];
  const costPerNightValues = [100, 150, 80, 120];
  const cities = ['Amsterdam', 'Hamburg', 'Amsterdam', 'Amsterdam'];
  const cityCoordinates = [
    { lat: 52.37403, lng: 4.88969, zoom: 12 },
    { lat: 65.37403, lng: 4.88969, zoom: 12 },
    { lat: 57.37403, lng: 4.88969, zoom: 12 },
    { lat: 59.37403, lng: 4.88969, zoom: 12 },
  ];
  const offerCoordinates = [
    { lat: 52.3909553943508, lng: 4.85309666406198 },
    { lat: 62.3609553943508, lng: 4.85309666406198 },
    { lat: 52.3909553943508, lng: 4.929309666406198 },
    { lat: 52.3809553943508, lng: 4.939309666406198 },
  ];
  const hostAvatarImages = [
    '../img/avatar-angelina.jpg',
    '../img/avatar-angelina.jpg',
    '../img/avatar-angelina.jpg',
    '../img/avatar-angelina.jpg',
  ];
  const hostNames = ['Georg', 'Alice', 'John', 'David'];
  const isProValues = [true, false, true, false];
  const reviewCounts = [12, 10, 8, 18];

  return Array.from({ length: count }, (_, i) => ({
    image: images[i],
    smalllImage: smalllImages[i],
    header: headers[i],
    description: descriptions[i],
    isPrime: isPrimeValues[i],
    isFavourite: isFavoritValues[i],
    housingType: housingTypes[i],
    rating: ratings[i],
    bedroomQuantity: bedroomQuantities[i],
    maxGuest: maxGuestValues[i],
    costPerNight: costPerNightValues[i],
    city: {
      location: cityCoordinates[i],
      name: cities[i],
    },
    site: offerCoordinates[i],
    host: {
      avatarImage: hostAvatarImages[i],
      hostName: hostNames[i],
      isPro: isProValues[i],
      id: 10 + i,
    },
    reviews: reviewCounts[i],
    id: 100 + i,
  }));
}

const numberOfOffers = 4;
const generatedOffers = generateMultipleOffers(numberOfOffers);

export { generatedOffers };
