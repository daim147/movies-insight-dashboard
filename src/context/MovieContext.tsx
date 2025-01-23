import { createContext } from 'react';
import { MovieContextData } from '../types';

export const MovieContext = createContext<MovieContextData | undefined>(undefined);
