import { Dimensions, PixelRatio } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;
const horizontalScaleFactor = SCREEN_WIDTH / DESIGN_WIDTH;
const verticalScaleFactor = SCREEN_HEIGHT / DESIGN_HEIGHT;

export const scaledFont = (size: number) => PixelRatio.roundToNearestPixel(size * horizontalScaleFactor);
export const scaledWidth = (width: number) => PixelRatio.roundToNearestPixel(width * horizontalScaleFactor);
export const scaledHeight = (height: number) => PixelRatio.roundToNearestPixel(height * verticalScaleFactor); 