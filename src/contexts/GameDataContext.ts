import { createContext } from 'react';
import { GameDataContextType } from '../types';

export const GameDataContext = createContext<GameDataContextType | undefined>(undefined);